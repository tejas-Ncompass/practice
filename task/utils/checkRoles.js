const { execute } = require('../../utils/database');

const getRoleQuery=`
SELECT 
    roleId
FROM 
    employeeDetails
WHERE
    ssid= ?
AND
    orgId= ?
`
async function checkRole(userDetails) {

    const result = await execute(getRoleQuery, [userDetails]);
    return result;
}

module.exports = checkRole;