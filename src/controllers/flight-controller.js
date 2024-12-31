

const { StatusCodes } = require("http-status-codes");
const {FlightService, AirportService}=require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req,res) {
    try {
        const flight=await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
        })
    
        SuccessResponse.message='Succesfully created the flight',
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function getFlight(req,res) {
    try {
        const flight=await FlightService.getFlight(req.params.id);
        SuccessResponse.message='Successfully retrieved  flight';
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
       
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        
        
      
        SuccessResponse.message='Succesfully retrived all flights'
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.StatusCode)
                .json(ErrorResponse);
    }
}

async function updateSeats(req,res){
    try {
       const response=await FlightService.updateSeats({
        flightId:req.params.id,
        seats:req.body.seats,
        dec:req.body.dec
       })
        SuccessResponse.message='Succesfully updated the Seats of the flight',
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

async function destroyFlight(req,res){
    try {
        const flight=await FlightService.destroyFlight(req.params.id);
        SuccessResponse.message='succesfully destroyed flight';
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}

module.exports={
    createFlight,
    getFlight,
    getAllFlights,
    updateSeats,
    destroyFlight,
}