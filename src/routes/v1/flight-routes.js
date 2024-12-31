const express=require("express");
const {flightController}=require("../../controllers");
const {flightmiddleware}=require("../../middlewares");


const router=express.Router();

router.post("/",flightmiddleware.validateCreaterequest,flightController.createFlight);
router.get("/",flightController.getAllFlights);
router.get("/:id",flightController.getFlight);
router.patch("/:id/seats",flightmiddleware.validateUpdateSeatsrequest,flightController.updateSeats);
router.delete("/:id",flightController.destroyFlight);

module.exports=router;