const express=require("express");
const { airportcontroller } = require("../../controllers");
const { airportmiddlewares } = require("../../middlewares");

const router=express.Router();

router.get("/",airportcontroller.getAirports);
router.get("/:id",airportcontroller.getAirport);
router.post("/",airportmiddlewares.validateCreaterequest,airportcontroller.createAirpot);
router.patch("/:id",airportmiddlewares.validateCreaterequest,airportcontroller.updateAirport);
router.delete("/:id",airportcontroller.destroyAirport);
 

module.exports=router;