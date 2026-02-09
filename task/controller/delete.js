const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { execute } = require('../../utils/database');

const deleteTaskQuery = `
UPDATE 
    tasks
SET 
    isDeleted = ? 
WHERE 
    taskID = ?
AND
    orgId= ?
`
const deleteTask = async (req, res) => {

    const orgId = req.headers['orgid'];
    const taskId = req.params.taskId;

    const row = await execute(deleteTaskQuery, [taskId, orgId]);

    if (row.affectedRows === 0) {
        throw new customError(`Task not found or permission denied`, 404, `Not Found`);
    }

    return responseHandler(res, 200, "Task Deleted",);
}

module.exports = deleteTask ;