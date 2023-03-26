const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    project_name:{
        type: String,
        require: true,
        trim : true,
        max: 150,
        unique : true
    },
    semester:{
        type: String,
        trim : true,
        require: true
    },
    instructor:{
        type: String,
        require: true,
        trim : true
    },
    description:{
        type: String,
        require: true,
        max : 300
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
        type: String
    }
})

mongoose.model("Project", projectSchema)