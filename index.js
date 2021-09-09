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
//views folder handlebar routing
application.set('views', path.join(__dirname, "/views/"));

application.engine("hbs", expressHandlerbars({
    extname:"hbs",
    defaultLayout: "mainlayout",
    layoutDir: __dirname+ "/views/layouts"
}))
application.set("view engine", "hbs")
//set handlebar routes
application.get("/", (req, res)=>{
   
   res.render("index", {})
})

application.use("/sight", SightController)

application.use(express.static('public'))
application.use(express.static('files'))


application.listen("3000",()=>{
    console.log("Server started");
});

//test
/*
application.route({
    method: 'GET',
    path: '/{map.js}',
    handler: {
      directory: {
        path:    __dirname + '/public/js',
        listing: false,
        index:   false
      }
    }
  });
  application.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.view('index');
    }
  });*/
  
  