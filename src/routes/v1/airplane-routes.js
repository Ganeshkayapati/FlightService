 const express=require("express");
 const {airplanecontroller}=require("../../controllers")
 const {airplanemiddlewares}=require("../../middlewares")

 const router=express.Router();

 router.post("/",airplanemiddlewares.validateCreateRequest,airplanecontroller.createAirplane);
 router.get("/",airplanecontroller.getAirplanes);
 router.get("/:id",airplanecontroller.getAirplane);
 router.delete("/:id",airplanecontroller.destroyAirplane);
 router.patch("/:id",airplanemiddlewares.validateputRequest,airplanecontroller.updateAirplane);

 module.exports=router;
  