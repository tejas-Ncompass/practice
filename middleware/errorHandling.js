function errorHandler(err,req,res,next){

    err.statusCode = err.statusCode || 500;
    err.errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
    err.message = err.message || 'Unexpected Error!';

    return res.status(err.statusCode).json({
        statusCode:err.statusCode,
        errorCode:err.errorCode,
        message: err.message
    })

}

module.exports = errorHandler;