const mongoose = require('mongoose');
const {SEMESTER} = require('../utils/server.constants')

const currentYear = new Date().getFullYear()

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
        require: true,
        enum : SEMESTER,
        trim : true
    },
    semester_year:{
        type: Number,
        require: true,
        min : 2000,
        max : currentYear
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
    team:{
        type: [String],
        require: true,
        trim : true
    },
    documentation:{
        type: String,
        require: true,
        max : 300,
        trim : true
    },
    favorite:{
        type: Boolean,
        require: true,
        default : false
    },
    website: {
        type: String,
    },
    github: {
        type: String,
    },
    pivitol_tracker: {
        type:String,
    },
    programming_languages: {
        type : [String],
        trim: true,
        default:  []
    }

}, {
    timestamps : true
})

mongoose.model("ProjectModel", projectSchema)