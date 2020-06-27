exports.successResponseWithData = function (res, msg, data) {
    var resBody={
        code:0,
        msg:msg,
        records:data
    };
    return res.status(200).json(resBody)
}

exports.errorResponse = function (res,msg,code) {
    var resBody = {
        code:code,
        msg:msg,
        data:false
    }
    return res.status(code).json(resBody)
}