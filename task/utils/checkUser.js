const { execute } = require('../../utils/database');

const checkUserQuery = `
SELECT 
    roleId
FROM 
    employeeDetails
WHERE 
    ssid=?
AND 
    orgId= ?
`
async function checkUserExists(SSid,orgId) {

    const result = await execute(checkUserQuery, [SSid, orgId]);
    return result;
}

module.exports = checkUserExists;