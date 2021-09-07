const mongoose = require ("mongoose");
//Dataschema for user inputs
    var SightSchema = new mongoose.Schema({
        sightname:{
            type : String,
        },
        sighturl:{
            type: String
        },
        sightdescription:{
            type: String

        },
        
});
mongoose.model("Sight",SightSchema)
