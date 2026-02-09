const { verifyToken } = require('../utils/jwt-methods.js');
const customError = require('../utils/errorClass.js');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new customError(`Access Denied`, 401, `Unauthorized`);
    }

    try {
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = authenticateToken;
