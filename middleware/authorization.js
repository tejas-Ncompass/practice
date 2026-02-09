const { execute } = require('../utils/database.js');
const customError = require('../utils/errorClass.js');

const selectRoleQuery = `
SELECT 
    roleName
FROM 
    roles AS r
LEFT JOIN 
    employeeDetails AS ed ON r.roleId=ed.roleId
WHERE
    ed.orgId= ? 
AND 
    ed.ssid= ?
`

const authorizeRole = (allowedRoles) => {
    return async (req, res) => {
        
            const orgid = req.headers['orgid'];
            const SSid=req.user.ssid;

            const [rows] = await execute(selectRoleQuery, [orgid,SSid]);

            if (!rows) {

                throw new customError(`No roles found!`, 403, `Forbidden`);
            }

            const userRole = rows.roleName;
            
            if (allowedRoles.includes(userRole)) {
                next();
            } 

            else {

                throw new customError(`Permission Denied`, 403, `Forbidden`);

            }
        }
};

module.exports = authorizeRole; 
