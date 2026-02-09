const customError = require('../utils/errorClass');

const notFoundEndpoint= (req,res,next)=>
{
    const err = new customError(`The end point requested :${req.url} does not exist`,404,`Not Found Error`,{});
    next(err);
}

module.exports= notFoundEndpoint;



