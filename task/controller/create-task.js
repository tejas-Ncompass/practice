const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { execute } = require('../../utils/database');
const checkRole = require('../utils/checkRoles.js');

const createTaskQuery = `
INSERT INTO 
        tasks(
        taskId, 
        title,
        description,
        orgId,
        storyPoints,
        assignee,
        reporter,
        createdAt)
VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

const createTask = async (req, res, next) => {
    try{
    const reporterId = req.user.ssid;
    const orgId = req.headers['orgid'];
    const { taskId, title, description, storyPoints, assignee = null, createdAt } = req.body;

    const reporterDetails = [reporterId, orgId];
    const reporterRole = checkRole(reporterDetails);
    const rRole = reporterRole[0].roleId;

    let aRole;
    if(assignee) {
        const assigneeDetails = [assignee, orgId];
        const assigneeRole = checkRole(assigneeDetails);

        if(assigneeRole.length == 0) {
            throw new customError(`User does'nt exist in the organization`, 404, `Not Found`);
        }
        aRole = assigneeRole[0].roleId;
    }

    if (assignee && aRole == 'RO01' && rRole == 'RA01') {
        throw new customError(`Permission denied`, 403, `Forbidden`);
    }

    const taskDetails = [taskId, title, description, orgId, storyPoints, assignee, reporterId, createdAt];
    const task = await execute(createTaskQuery, taskDetails);

    responseHandler(res, 200, "Task created!", { id: taskId, title: title, assigned_to: assignee });
}
catch(err)
{
    console.log(err);
    next(err);
}
}


module.exports = createTask;