const { execute } = require('../../utils/database');

const getIdQuery = `
SELECT 
    ssid
FROM 
    employeeDetails
WHERE 
    roleId ="RO01" 
AND 
    orgId= ?
`

async function checkOwner(orgId) {

    const result = await execute(getIdQuery, [orgId]);
    return result;
}

module.exports = checkOwner ;