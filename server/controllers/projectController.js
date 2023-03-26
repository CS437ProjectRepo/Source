const mongoose = require('mongoose');
const Post = mongoose.model('Project')
const axios = require('axios');

const allPosts = async(req, res) => {
   try{
    const posts = await Post.find()
    return res.json({posts});
   } catch(error){
    return res.status(500).json({error: error.message});
   }
}

const appendLanguageTags = async(github, tags) => {
    if (!github) return;
    if (!tags) tags = [];
    const githubPath = new URL(github).pathname;
    try {
        const languageResponse = await axios.get(`https://api.github.com/repos${githubPath}/languages`);
        if(tags && languageResponse.data != {}){
            for(const tag in languageResponse.data){
                tags.push(tag);
            }
        } 
        return tags
    } catch(error){
        // console.log(error);
        throw new Error ("invalid gthub link")  
    }
}

const createPost = async(req, res) => {
    const {project_name, semester, instructor, github, description, team, documentation, website, pivitol_tracker} = req.body
    let {tags} = req.body
    if(!project_name || !semester || !instructor || !description || !team || !documentation){
        return res.status(422).json({error: "please add all the fields"})
    }
    const existingPost = await Post.findOne({project_name: project_name});

    try {
        if (existingPost){
            return res.status(422).json({error: "project with that title already exists"})
        }
        
        try{
            tags = await appendLanguageTags(github, tags, res); 
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
            res.status(200).json({message: "success!"})
        } catch (error) {
            if (error.name === "ValidationError") {
              return res.status(422).json({ message: error.message });
            } else {
              return res.json({ message: error.message });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Sorry, we are experiencing technical difficulties" });
    }
}

const editPost = async(res, req)  => {
    const {_id} = req.body
    const newData = (({_id, __v, ...o}) => o)(req.body)

    Post.findByIdAndUpdate(_id, newData)
    .then(()=>{
        res.json({message:"success. post updated"})
    })
    .catch(err=>{
        res.status(500).json({error: "invalid format"})
        console.log(err)
    })
}


module.exports = {
    allPosts,
    createPost,
    editPost
}