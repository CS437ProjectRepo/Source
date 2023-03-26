const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    project_name:{
        type: String,
        require: true
    },
    semester:{
        type: String,
        require: true
    },
    instructor:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    tags: {
        type: [String],
    },
    team:{
        type: [String],
        require: true
    },
    documentation:{
        type: String,
        require: true
    },
    website: {
        type: String
    },
    github: {
        type: String
    },
    pivitol_tracker: {
        type:String
    }
})

mongoose.model("Project", projectSchema)