
const {AirplaneService}=require("../services");
const {StatusCodes}=require("http-status-codes");
const { response } = require("express");
const {SuccessResponse,ErrorResponse}=require("../utils/common");
const { get } = require("../routes/v1/airplane-routes");

async function createAirplane(req,res) {
     
    try {
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        SuccessResponse.message='Successfully created an Airplane',
        SuccessResponse.data=airplane
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        
        ErrorResponse.error=error
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function getAirplanes(req,res){
    try {
        const airplanes=await AirplaneService.getAirplanes();
        console.log(airplanes);
        SuccessResponse.message='Successfully retrieved  Airplanes';
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
    
    
}

async function getAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message='Successfully retrieved  Airplane';
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
       
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function destroyAirplane(req,res){
    try {
        const airplane=await AirplaneService.destroyAirplane(req.params.id);
     
        SuccessResponse.message='Successfully deleted  Airplane';
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req,res){
    try {
        const airplane=await AirplaneService.updateAirplane(req.params.id,{
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        

        SuccessResponse.message='Successfully updated Airplane';
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}