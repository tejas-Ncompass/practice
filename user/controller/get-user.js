const { query } = require('../../utils/database.js');
const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');

const selectAllusersQuery = `
SELECT 
    ssid 
    name,  
    email, 
    ph_num,
    createdAt                                  
FROM 
    users
WHERE 
    active= 1 
`

const getAllUsers = async (req, res) => {

    const users = await query(selectAllusersQuery);

    if (users.length === 0) {
        throw new customError(`Users not found`, 404, `Not Found`);
    }

    return responseHandler(res, 200, "All Users", users);
}

module.exports = getAllUsers;
