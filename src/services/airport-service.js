const { StatusCodes } = require("http-status-codes");
const {AirportRepository}=require("../repositories");
const AppError = require("../utils/errors/app-error");
const airportrepository=new AirportRepository();

async function createAirpot(data){
    try {
        const airport=await airportrepository.create(data);
        return airport;
    } catch (error) {
        if(error.name='SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirports() {
    try {
        const airports=await airportrepository.getAll();
        return airports;
        
    } catch (error) {
        
        throw new AppError("Cannot get Airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport(id) {
    try {
        const airport=await airportrepository.get(id);
        return airport;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to retrive is not found",error.StatusCode);
        }
        throw new AppError("Cannot get airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const airport=await airportrepository.destroy(id);
        return airport
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to delete is not found",error.StatusCode);
        }
        throw new AppError("Cannot delete airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(data,id) {
    try {
        const airport=await airportrepository.update(id,data);
        return airport;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to update is not found",error.StatusCode);
        }
        throw new AppError("cannot update airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirpot,
    updateAirport,
    getAirport,
    getAirports,
    destroyAirport
}