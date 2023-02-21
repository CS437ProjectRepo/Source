const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    project_name:{
        type: String,
        require: true
    },
    semester:{
        type: String,
        require: true
    },
    year:{
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
    team:{
        type: [String],
        require: true
    },
    documentation:{
        type: String,
        require: true
    },
    favorite:{
        type: Boolean,
        require: true,
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

mongoose.model("Post", userSchema)