const bcrypt = require('bcrypt');
const { execute } = require('../../utils/database');
const { getToken } = require('../../utils/jwt-methods.js');
const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');

const loginQuery = `
SELECT 
    u.id,
    u.ssid, 
    u.email, 
    s.password  
FROM 
    users u 
JOIN 
    secrets s 
ON  u.id = s.id 
WHERE 
    u.email = ?`


const login = async (req, res) => {

    const { email, password } = req.body;

    const users = await execute(loginQuery, [email]);

    if (users.length === 0) {
        throw new customError(`Invalid email or password`, 401, `Unauthorized HTTP error`);
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new customError(`Invalid email or password`, 401, `Unauthorized HTTP error`);
    }

    const payload = { id: user.id, ssid: user.ssid, email: user.email };
    const token = getToken(payload);

    responseHandler(res, 200, "Login Successful!", { token: token });
}

module.exports = login;
