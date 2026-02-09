const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { query } = require('../../utils/database');


const getAllTasks = async (req, res) => {

    const orgId = req.headers['orgid'];
    const { assignee, taskStatus, afterDate, beforeDate, sortby = 'createdAt', pageNo = 1, pageSize = 10 } = req.query;

    let result;
    const sortOptions = ['createdAt', 'updatedAt', 'storyPoints'];
    const limit = parseInt(pageSize);
    const offset = (parseInt(pageNo) - 1) * limit;
    const taskValues = [orgId];

    let getTasksQuery = `
    SELECT 
        taskId,
        title,
        taskStatus,
        storyPoints,
        assignee,
        reporter,
        createdAt,
        updatedAt
    FROM 
        tasks 
    WHERE 
        orgId= ?
    `
    
    if(assignee) {
        getTasksQuery += ` AND assignee = ?`;
        taskValues.push(assignee);
    }

    if(taskStatus) {
        getTasksQuery += ` AND taskStatus = ?`;
        taskValues.push(taskStatus);
    }

    if(afterDate) {
        getTasksQuery += ` AND createdAT >= ?`;
        taskValues.push(afterDate);
    }

    if(beforeDate) {
        getTasksQuery += ` AND createdAT =< ?`;
        taskValues.push(beforeDate);
    }

    if(sortOptions.includes(sortby)) {
        getTasksQuery += ` ORDER BY ${sortby}`;
    }

    getTasksQuery += ` LIMIT ?  OFFSET ?`;
    taskValues.push(limit, offset);

    result = await query(getTasksQuery, taskValues);

    responseHandler(res, 200, "Tasks in the users organization", result);
}


module.exports = getAllTasks;