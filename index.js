const connection =require("./model");
const express=require ("express");
const application=express();
const path = require("path");
const expressHandlerbars = require("express-handlebars");
const bodyparser = require("body-parser");

const SightController = require("./controllers/sights")

application.use(bodyparser.urlencoded({
    extended:true
}))
//views folder handlebar routing?
application.set('views', path.join(__dirname, "/views/"));

application.engine("hbs", expressHandlerbars({
    extname:"hbs",
    defaultLayout: "mainlayout",
    layoutDir: __dirname+ "/views/layouts"
}))
application.set("view engine", "hbs")

application.get("/", (req, res)=>{
   
   res.render("index", {})
})

application.use("/sight", SightController)

application.listen("3000",()=>{
    console.log("Server started");
});