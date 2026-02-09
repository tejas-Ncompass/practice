const jwt = require("jsonwebtoken");

function getToken(payload){

    const token = jwt.sign(
                            payload, 
                            process.env.JWT_SECRET, 
                            { expiresIn: "4h" });
    return token;  
}

function verifyToken(token)
{
   const decode = jwt.verify(
                            token, 
                            process.env.JWT_SECRET);

    return decode;
}

module.exports ={ getToken, verifyToken } ;