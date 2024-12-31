const express=require("express");
const {citycontroller}=require("../../controllers")
const {citymiddlewares}=require("../../middlewares")
const router=express.Router();


router.post("/",citymiddlewares.validateCreateRequest,citycontroller.createCity);
router.get("/",citycontroller.getCities);
router.get("/:id",citycontroller.getCity);
router.delete("/:id",citycontroller.destroyCity);
router.patch("/:id",citymiddlewares.validateCreateRequest,citycontroller.updateCity);

module.exports=router;