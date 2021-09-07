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
        sightlongitude:{
            type: Number

        },
        sightlatitude:{
            type: Number

        },
        
});
mongoose.model("Sight",SightSchema)
