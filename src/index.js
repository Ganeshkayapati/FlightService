
const express=require("express");
const {serverConfig,logger} =require("./config/index");
const apiRoutes=require("./routes/index"); 
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api",apiRoutes);
//app.use("/flightService/api",apiRoutes);



app.listen(serverConfig.PORT,()=>{
    console.log(`Listening to port ${serverConfig.PORT }`);
    //logger.info('succesfully started server')
}) 