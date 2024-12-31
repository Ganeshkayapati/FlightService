const { StatusCodes } = require("http-status-codes");
const {CityService}=require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")

async function createCity(req,res){
    try {
        const city=await CityService.createCity({
            name:req.body.name
        })
        console.log(city)
        SuccessResponse.message='Succesfully created the new city';
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }

}
async function getCities(req,res) {
    try {
        const cities=await CityService.getCities();
        SuccessResponse.message='Succefully retrieved cities';
        SuccessResponse.data=cities;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function getCity(req,res) {
    try {
        const city=await CityService.getCity(req.params.id);
        SuccessResponse.message='Succefully retrieved city';
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}
async function destroyCity(req,res) {
    try {
        const city=await CityService.destroyCity(req.params.id);
        SuccessResponse.message='Succefully deleted city';
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function updateCity(req,res) {
    try {
        const city=await CityService.updateCity(req.params.id,{name:req.body.name});
        SuccessResponse.message='Succefully updated city';
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}


module.exports={
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}