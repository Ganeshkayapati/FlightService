const {airportcontroller}=require("../controllers/");
const { AirplaneService, AirportService, CityService } = require("../services");
const AppError=require("../utils/errors/app-error");
const {SuccessResponse,ErrorResponse}=require("../utils/common");
const {StatusCodes}=require("http-status-codes");
const { CityRepository } = require("../repositories");


async function validateCreaterequest(req,res,next) {
    if(!req.body.name || !req.body.code || !req.body.cityId ){
        ErrorResponse.message='Something went wrong while creating airplane';

        ErrorResponse.error=new AppError([ 'name code and cityId not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    
     try {
        const city = await CityService.getCity(req.body.cityId);
       
    } catch (error) {
      
       ErrorResponse.message = 'City not found';
       ErrorResponse.error = new AppError(['No city found with this cityId'], StatusCodes.NOT_FOUND);
       return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }


    next();
    
}


module.exports={
    validateCreaterequest
}