const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth-jwt')
const mongoose = require('mongoose');
const Post = mongoose.model('ProjectModel')

router.get('/allposts', (req,res)=>{
    Post.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/favorites', (req,res)=>{
    Post.find({favorite: true})
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost', requireLogin, (req, res)=>{
    const {project_name,semester, year,instructor,description, team, documentation, favorite} = req.body
    if(!project_name || !semester || !year || !instructor || !description || !team || !documentation || !favorite){
        return res.status(422).json({error:"please add all the feilds"})
    }
    Post.findOne({project_name: project_name})
     .then(existingPost=>{
        if(existingPost){
            return res.status(422).json({error: "project with that title already exists"})
        }

        const {website, github, pivitol_tracker} = req.body
        const post = new Post({
            project_name,
            semester,
            year,
            instructor,
            description,
            team,
            documentation,
            favorite,
            website,
            github,
            pivitol_tracker
        })
        post.save().then(result=>{
            res.json({post: result})
        })
        .catch(err=>{
            console.log(err)
        })
     })
})

router.post('/editpost', requireLogin, (req,res)=>{
    const {_id} = req.body
    const newData = (({_id, __v, ...o}) => o)(req.body)

    Post.findByIdAndUpdate(_id, newData)
    .then(()=>{
        res.json({message:"success. post updated"})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router