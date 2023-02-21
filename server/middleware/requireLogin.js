const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");


module.exports = (req, res, next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "you must be logged in"})
    }

    //authorization will be formatted as "Bearer feahfioeaiofho89432"
    //remove the "Bearer " and only the jwt will be left
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWTSECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id)
        .then(userdata=>{
            req.user = userdata
        })

        next()
    })

}