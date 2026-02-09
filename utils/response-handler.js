function responseHandler(res, resStatus, resMessage, resData) {
    res.status(resStatus).json(
        {
            statusCode: resStatus,
            message: resMessage,
            data: resData
        }
    )
}
module.exports = responseHandler;