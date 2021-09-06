//kann so bleiben wie es ist

const mongoose =require("mongoose");

//database connection and callback if it works
mongoose.connect("mongodb://localhost:27017/geosoftwaredatabase",{useNewUrlParser:true},(error)=>{
    if(!error)
        {
            console.log("Success Cennected");
        }
    else{
            console.log("Error connecting to database.")
    }


});
const sight = require("./sight.model");