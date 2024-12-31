const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository} =require("../repositories")
const AppError=require("../utils/errors/app-error");
const { where } = require("sequelize");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { response } = require("express");
const airplanerepository=new AirplaneRepository(); 

async function createAirplane(data){
    try {
        const airplane=await airplanerepository.create(data);
        return airplane
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        

        throw new AppError("Cannot create new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getAirplanes() {
    try{
        const airplanes=await airplanerepository.getAll();
        return airplanes;
    }catch(error){
        throw new AppError("Cannot get Airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplanerepository.get(id);
        return airplane; 
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are searching is not found",error.StatusCode) 
        }
        throw new AppError("Cannot get Airplane",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const airplane=await airplanerepository.destroy(id);
        
        return airplane;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to delete is not found",error.StatusCode)
        }
        throw new AppError("Cannot delete Airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function updateAirplane(id,data) {
    try {
        const airplane=await airplanerepository.update(id,data);
        return airplane;
    } catch (error) {
         if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to update is not found",error.StatusCode)
        }
        throw new AppError("Cannot update Airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
    
}




module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}