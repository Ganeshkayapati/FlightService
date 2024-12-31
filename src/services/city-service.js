const { StatusCodes } = require("http-status-codes");
const {CityRepository} =require("../repositories/");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");

const cityrepository=new CityRepository();

async function createCity(data){
    try {
        const city=await cityrepository.create(data);
        console.log(city);
        return city;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new City ",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
    const cities=await cityrepository.getAll();
    return cities;
    } catch (error) {
        throw new AppError("Cannot retrive cities",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try {
    const city=await cityrepository.get(id);
    return city;
    } catch (error) {
        throw new AppError("Cannot retrive city",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
    const city=await cityrepository.destroy(id);
    return city;
    } catch (error) {
        throw new AppError("Cannot delete city",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
    const city=await cityrepository.update(id,data);
    return city;
    } catch (error) {
        throw new AppError("Cannot update city",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}