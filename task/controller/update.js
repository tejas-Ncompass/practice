const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { execute } = require('../../utils/database');
const checkUserExists = require('../utils/checkUser.js');


const updateAssigneeQuery = `
UPDATE 
    tasks
SET 
    assignee = ? 
WHERE 
    taskID = ?
AND
    orgId= ?
`

const updateTaskstatusQuery = `
UPDATE 
    tasks
SET 
    taskStatus = ? 
WHERE 
    taskID = ?
AND 
    orgId= ?
AND
    assignee= ?
`

// Reassign task to a different user (only by Owner and Admin)

const reassignTask = async (req, res) => {

    const orgId = req.headers['orgid'];
    const { taskId, newAssignee } = req.body;

    let result;

    const assigneeExists = checkUserExists(newAssignee, orgId);

    if (!assigneeExists) {
        throw new customError(`User doesnt belong to the organization`, 404, `Not found`);
    }

    const updatedAssignee = [newAssignee, taskId, orgId];
    result = await execute(updateAssigneeQuery, updatedAssignee);

    return responseHandler(res, 200, "Reassigned Task",);

}


// Updation of task status by users

const updateTaskstatus = async (req, res) => {

    const orgId = req.headers['orgid'];
    const { taskId, taskStatus } = req.body;
    const SSid = req.user.ssid;

    const status = ['in progress', 'wont do', 'pending', 'blocked', 'completed'];

    let result;

    if (status.includes(taskStatus)) {
        const updatedStatus = [taskStatus, taskId, orgId, SSid];
        result = await execute(updateTaskstatusQuery, updatedStatus);
    }
    else {
        throw new customError(`Invalid task status`, 404, `Task status not found`, {});
    }

    return responseHandler(res, 200, "Updated Task Status", result);
}

module.exports = { reassignTask, updateTaskstatus };