
const AppError=require("../utils/errors/app-error")
const {SuccessResponse,ErrorResponse}=require("../utils/common");
const {StatusCodes}=require("http-status-codes");




async function validateCreaterequest(req, res, next) {
    if (
        !req.body.flightNumber || 
        !req.body.airplaneId || 
        !req.body.departureAirportId || 
        !req.body.arrivalAirportId || 
        !req.body.departureTime || 
        !req.body.arrivalTime || 
        !req.body.price || 
        !req.body.totalSeats
    ) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(
            ['flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price, or totalSeats are missing or invalid'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const departureTime = new Date(req.body.departureTime);
    const arrivalTime = new Date(req.body.arrivalTime);

    if (arrivalTime <= departureTime) {
        ErrorResponse.message = 'Arrival time cannot be earlier than departure time';
        ErrorResponse.error = new AppError(
            ['Arrival time must be after departure time'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.departureAirportId === req.body.arrivalAirportId) {
        ErrorResponse.message = 'Departure and Arrival airports cannot be the same';
        ErrorResponse.error = new AppError(
            ['Departure airport cannot be the same as arrival airport'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

async function validateUpdateSeatsrequest(req,res,next){
    if (
        !req.body.seats 
    ) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(
            ['seats are missing or invalid'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}



module.exports={
    validateCreaterequest,
    validateUpdateSeatsrequest
}