const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    project_name:{
        type: String,
        require: true,
        trim : true,
        max: 150,
        unique : true,
        label : 'Project Name'
    },
    semester:{
        type: String,
        trim : true,
        require: true,
        label : 'Semester'
    },
    instructor:{
        type: String,
        require: true,
        trim : true,
        label: 'Instructor'
    },
    description:{
        type: String,
        require: true,
        max : 300,
        label: 'Description'
    },
    tags: {
        type: [String],
        label: 'Tags'
    },
    team:{
        type: [String],
        require: true,
        label : 'Team Members'
    },
    documentation:{
        type: String,
        require: true,
        label: 'Documentation'
    },
    website: {
        type: String,
        label: 'Website'
    },
    github: {
        type: String,
        label: 'Github'
    },
    pivitol_tracker: {
        type: String,
        label : 'Pivitol Tracker'
    }
})

mongoose.model("Project", projectSchema)