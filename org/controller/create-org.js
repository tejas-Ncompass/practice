const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { execute, startTransact, commit, rollback } = require('../../utils/database');

const createOrgQuery = `
INSERT INTO 
        organization (
        orgId,
        orgName, 
        ownerId, 
        createdAt) 
VALUES (?, ?, ?, ?)`

const insertOwnerQuery = `
INSERT INTO 
        employeeDetails(
        orgId, 
        ssid,
        roleId,
        dateOfJoin)
VALUES(?, ?, ?, ?)`


const createOrg = async (req, res) => {
        let connection;

        try {
                const ownerId = req.user.ssid;
                const { orgId, name, createdAt, dateOfJoin } = req.body;
                const roleId = "RO01";

                connection = await startTransact();

                const orgDetails = [orgId, name, ownerId, createdAt];
                const organisation = await execute(createOrgQuery, orgDetails);

                const ownerDetails = [orgId, ownerId, roleId, dateOfJoin];
                const owner = await execute(insertOwnerQuery, ownerDetails);

                await commit(connection);

                responseHandler(res, 200, "Organization created!", { id: orgId, name: name, owner: ownerId });
        }
        catch (err) {
                if (connection) {
                        await rollback(connection);
                }
                next(err);
        }

};

module.exports = createOrg;