const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { query } = require('../../utils/database');
const checkOwner = require('../utils/checkOwner.js');

const bulkInsertQuery = `
INSERT INTO 
        employeeDetails (
        orgId, 
        ssid, 
        roleId, 
        invitedBy, 
        dateOfJoin) 
VALUES ?`

const addUsers = async (req, res) => {

        const orgId = req.params.orgId;
        const SSid = req.user.ssid;
        const usersData = req.body;

        const ownerId = checkOwner(orgId);
        const oid = ownerId[0].ssid;

        if (SSid === oid) {
                const Users = usersData.map((emp) => [orgId, emp.ssid, emp.roleId, oid, emp.dateOfJoin]);
                await query(bulkInsertQuery, [Users]);
        }

        else {
                throw new customError(`User is not the Owner of the Organization`, 401, `Unauthorized`, {});
        }


        responseHandler(res, 200, "Users added to organization!", { orgid: orgId });

}

module.exports = addUsers;
