const { execute } = require('../../utils/database');

const getOrgIdQuery = `
SELECT 
    roleId
FROM 
    employeeDetails
WHERE 
    ssid=?
AND
    orgId= ?
`

async function checkUser(SSid,orgId) {

    const result = await execute(getOrgIdQuery, [SSid,orgId]);
    return result;
}

module.exports = checkUser ;