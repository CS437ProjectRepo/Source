const mongoose = require('mongoose');
const Post = mongoose.model('Project')
const { MESSAGES} = require("../utils/server.constants");
const {appendLanguageTags} = require("../utils/helper");

const allprojects = async(req, res) => {
   try{
    const posts = await Post.find()
    return res.json({posts});
   } catch(error){
    return res.status(500).json({error: error.message});
   }
}

const createproject = async(req, res) => {
    const {project_name, semester, instructor, github, description, team, documentation, website, pivitol_tracker} = req.body
    let {tags} = req.body
    // if(!project_name || !semester || !instructor || !description || !team || !documentation){
    //     return res.status(422).json({error: "please add all the fields"})
    // }
    const existingPost = await Post.findOne({project_name: project_name});

    try {
        if (existingPost){
            return res.status(422).json({error: "project with that title already exists"})
        }
        
        try{
            tags = await appendLanguageTags(github, tags); 
        } catch(e){
            return res.status(422).json({error: e.message});
        }
        
        const post = new Post({
            project_name,
            semester,
            instructor,
            description,
            tags,
            team,
            documentation,
            website,
            github,
            pivitol_tracker
        })

        try {
            await post.save();
            res.status(201).json({message: MESSAGES.PROJECT_CREATED})
        } catch (error) {
            if (error.name === "ValidationError") {
              return res.status(422).json({ message: error.message });
            } else {
              return res.status(422).json({ message: error.message });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const updateProject = async (req, res) => {
    const {project_name} = req.body;
    try {
      const project = await Project.findOne({project_name: project_name})
      if(!project){
        return res.status(422).json({ error: MESSAGES.PROJECT_DOES_NOT_EXIST });
      }
      const { _id } = project
      let newData = (({ _id, __v, ...o }) => o)(req.body);
      //validate the github link
      if(req.body.hasOwnProperty("github")) {
        const {github} = req.body
        let tags = req.body
        try{
            tags = await appendLanguageTags(github, tags); 
        } catch(e){
            return res.status(422).json({error: e.message});
        }
        newData = {
            ...newData,
            tags: tags
          }
      }
      await Project.findByIdAndUpdate(_id, newData);
      return res.status(200).json({ message: MESSAGES.PROJECT_UPDATED });
    } catch (error) {
      if (error.name === "ValidationError") {
        console.log(error.message)
        return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({ error: MESSAGES.INVALID_PROJECT_FIELDS });
      }
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: MESSAGES.INTERNAL_SERVER_ERROR});
    }
  };


module.exports = {
    allprojects,
    createproject,
    updateProject
}