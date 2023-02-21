const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello")
})

router.post('/createadmin', (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "please add all of the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "user with that email already exists"})
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword=>{
            const user = new User({
                email,
                password: hashedPassword
            })
            user.save()
            .then((user)=>{
                res.json({message: "success! account created"})
            }) 
            .catch(err=>{
                console.log(err)
            }) 
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/adminlogin', (req, res)=>{
     const {email, password} = req.body
     if(!email||!password){
        return res.status(422).json({error: "please add all of the fields"})
     }
     User.findOne({email: email})
     .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error: "invlaid email or password"})
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({id: savedUser._id}, process.env.JWTSECRET)
                res.json({"token": token})
            } else{
                return res.status(422).json({error: "invlaid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
     })
})

module.exports = router;