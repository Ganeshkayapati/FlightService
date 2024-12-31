const {StatusCodes}  = require("http-status-codes")
const {ErrorResponse}=require("../utils/common");
const AppError = require("../utils/errors/app-error");

 
function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message='Something went wrong while creating airplane';

        ErrorResponse.error=new AppError([ 'model number not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    } 
    next();
}
function validateputRequest(req,res,next){
    if(!req.body.modelNumber && !req.body.capacity){
        ErrorResponse.message='Something went wrong while creating airplane';

        ErrorResponse.error=new AppError([ 'model number and capacity  not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if (!/^[a-z0-9]+$/i.test(req.body.modelNumber) || req.body.capacity>1000) {
        ErrorResponse.message='Something went wrong while updating airplane';
        ErrorResponse.error=new AppError(['model number should be alphanumeric and capacity should be lessthan equal to 1000 in the oncoming request '],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateputRequest
}