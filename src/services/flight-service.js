const { query } = require("express");
const FlightRepository = require("../repositories/flight-repository");

const AppError = require("../utils/errors/app-error");
const {StatusCodes}=require("http-status-codes");
const { destroyAirport } = require("./airport-service");
const { Op, where }=require("sequelize");
const { ErrorResponse } = require("../utils/common");



const flightrepository=new FlightRepository();

async function createFlight(data) {
    try {
        const flight=await flightrepository.create(data);
       
        return flight;
    } catch (error) {
        if(error.name=='SequilizeValidationError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);

        }
        throw new AppError('Cannot create airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter=[];
    const endingTripTime=" 23:59:00";
    let departureAirport=undefined;
    let arrivalAirport=undefined;

  
    if(query.trips) {
       
       [departureAirportId, arrivalAirportId] = query.trips.split("-"); 
   
       if (departureAirportId === arrivalAirportId) {
        throw new AppError("Departure and arrival cant be same",StatusCodes.BAD_REQUEST );
    }
       customFilter.departureAirportId = departureAirportId;
       customFilter.arrivalAirportId = arrivalAirportId;
      
    
    }
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        console.log(query.price)
        customFilter.price={
            [Op.between]:[minPrice,((maxPrice==undefined)?minPrice*1000:maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats=
        {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
        }
    }

    if(query.sort){
        const params=query.sort.split(",");
        const sortFilters=params.map((param)=>param.split("_"));
        sortFilter=sortFilters
    }
    
    try {
        const flights = await flightrepository.getAllFlights(customFilter,sortFilter);
        
          
        return flights;
        
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight=await flightrepository.get(id);
        return flight;
        
    } catch (error) {
        
        throw new AppError("Cannot get Flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        console.log(data);
       const response=await flightrepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
       console.log(response);
       return response;
    } catch (error) {
        
        throw new AppError("cannot update data of flight",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id) {
    try {
        const response=await flightrepository.destroy(id);
        return response;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("airplane you are trying to delete is not found",error.StatusCode);
        }
        throw new AppError("cannot delete airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getFlight,
    getAllFlights,
    updateSeats,
    destroyFlight
}
