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
    semester: {
        type: String,
        trim : true,
        require: true,
        label : 'Semester'
    },
    year: {
        type: Number,
        require: true,
        label: 'Year'
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
    languages: {
        type: [String],
        label: 'Coding Language(s)'
    },
    superlatives: {
        type: [String],
        label: 'Superlatives'
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
    drive_asset:{
        type: String,
        require: true,
        label: 'Google Drive Asset ID'
    },
    drive_link: {
        type: String,
        label : 'Google Drive Link'
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
    },
    development_type: {
        require: true,
        type: String,
        label : 'Development Type'
    },
    no_code_solution: {
        type: String,
        label : 'No code solution'
    },
    category: {
        require: true,
        type: String,
        label : 'Catagory'
    }
})

mongoose.model("Project", projectSchema)