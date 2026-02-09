const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { execute, startTransact, commit, rollback } = require('../../utils/database');

const deleteOrgQuery = `
UPDATE
    organization
SET
    active= 0
WHERE
    orgId = ?
AND 
    ownerId = ?
`
const deleteUserQuery = `
UPDATE 
    employeeDetails
SET 
    status=0
WHERE 
    orgId= ?
`

const deleteOrg = async (req, res) => {
    let connection;

    try {

        const ownerId = req.user.ssid;
        const orgid = req.params.orgId;

        connection = await startTransact();

        const result = await execute(deleteOrgQuery, [orgid, ownerId], connection);

        const userDeletion = await execute(deleteUserQuery, [orgid], connection);

        if (result.affectedRows === 0) {
            throw new customError(`Permission Denied: User is not the owner of the organization`, 401, `Unauthorized`);
        }

        await commit(connection);

        responseHandler(res, 200, "Organization deleted", { id: orgid, owner: ownerId });
    }
    catch (err) {
        if (connection) {
            await rollback(connection);
        }
        next(err);
    }
}
module.exports = deleteOrg;