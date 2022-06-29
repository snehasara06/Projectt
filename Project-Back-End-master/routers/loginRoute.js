// const express4 = require('express')
// const login = require('../models/login')
// const {loginValidation} = require('../validation')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')

// const router4 = express4.Router()
// router4.post('/', async (req, res) => {

//     const {error} = loginValidation(req.body);
//     if(error)
//     return res.status(400).send(error.details[0].message)

//     const user=await login.findOne({userId:req.body.userId})
//     if(!user)
//     return res.status(400).send('Invalid Username')

//     try{
//     const validPass=await bcrypt.compare(req.body.password,user.password)
//     if(!validPass)
//     return res.status(400).send('Password is Incorrect')
//     }
//     catch(err){
//         return console.log(err)
//     }

//     const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
//     res.header('auth-token',token).send(token)

// })

// module.exports = router4