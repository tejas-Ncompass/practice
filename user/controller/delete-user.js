const { execute } = require('../../utils/database.js');
const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');


const deleteUsersQuery =
`UPDATE 
    users  
SET 
    active= 0, 
    upadtedAt= ?,
    updatedBy= ?
WHERE 
    ssid = ? AND active =1
`

const deleteUser = async (req, res) => {

    const userId = req.user.ssid;
    const { SSid, updatedDate } = req.body;

    const users = await execute(deleteUsersQuery, [updatedDate, userId, SSid]);

    if (users.affectedRows === 0) {
        throw new customError(`User does not exist`, 404, `Not Found`);
    }

    return responseHandler(res, 200, "User Resigned", { userId: SSid });
}

module.exports = deleteUser;
