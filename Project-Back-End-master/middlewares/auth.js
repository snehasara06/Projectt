const jwt=require('jsonwebtoken')
require('dotenv').config()
const employee = require ('../models/employee')


exports.isAuthenticatedUser = async (req, res, next) => {

  if(!req.headers.authorization){
    //console.log(req.headers)
    return res.status(401).send("Access denied , Please login")
  }
  const token = req.headers.authorization.split(' ')[1]
  //console.log(token)
  if(token==='null'){
    return res.status(401).send("Access denied , Please login")
  }
  const data = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!data){
    return res.status(401).send("Access denied , Please login")
  }
  user=await employee.findById(data.id)
  //console.log(user)
  req.employeeId=data.id
  next()

    //const { token }  = req.cookies;
    // console.log("req/cookies:",req.cookies)
    // console.log("token",token)
    // try{
    //     if (!token) 
    //     return res.status(401).json("Access denied , Please login")
    //     const data = jwt.verify(token, process.env.TOKEN_SECRET)
    //     //console.log(data)
    //     user = await employee.findById(data.id)
    //     //console.log(user);
    //     next()
    // }
    // catch(err){
    //   return res.status(401).json({errorMessage : err})
    // }
}

// exports.authorizedRoles= (...roles)=>{

  
//   return (req,res,next)=>{
//     if(!roles.includes(req.user.role)){
//       return next(console.log("User not allowed to access this data"))
//     }
//     next()
//   }
  
// }
