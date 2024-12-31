const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirpot(req, res) {
  console.log("inside controller")
  try {
    const airport = await AirportService.createAirpot({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    (SuccessResponse.message = "Succesfully created Airport"),
      (SuccessResponse.data = airport);
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.message = "suceesfully retrieved airports";
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error=error;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAirport(req,res) {
    try {
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.message='succesfully retrived airport';
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function destroyAirport(req,res) {
    try {
        const airport=await AirportService.destroyAirport(req.params.id);
        SuccessResponse.message='succesfully destroyed airport';
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
    
}

async function updateAirport(req,res){
    try{
        const airport=await AirportService.updateAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        },req.params.id)
        console.log(airport)
        SuccessResponse.message='succesfully updated airport';
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

module.exports={
    createAirpot,
    getAirport,
    getAirports,
    updateAirport,
    destroyAirport
}
