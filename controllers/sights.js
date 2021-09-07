//file to setup routes
const express = require("express");
const mongoose = require("mongoose");

//router setup
const router = express.Router();
const SightModel=mongoose.model("Sight")
//aufruf add seite
router.get("/add", (req,res)=>{
    res.render("add-sight")
})
//aufruf impressum seite 
router.get("/impressum", (req,res)=>{
    res.render("impressum")
})
router.post("/add", (req,res)=>{
//name url description
var sight = new SightModel();
sight.sightname=req.body.sightname;
sight.sighturl=req.body.sighturl;
sight.sightdescription=req.body.sightdescription;


sight.save((err,doc)=>{
    if(!err)
    {
        res.redirect("/sight/list");
    }
    else
    {
        res.send("Error Occured");
    }

})
 
})


//list
router.get("/list", (req,res)=>{
  


    //docs => docs received from collection
    SightModel.find((err, docs)=>{
        if(!err)
        {
            console.log(docs);
            res.render("list",{data:docs})
        }
        else
        {
            res.send("Error")
        }
    })
    
});

//export router

module.exports=router;