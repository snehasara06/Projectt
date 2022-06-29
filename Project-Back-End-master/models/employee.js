const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

const employee=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    employeeId:{
        type:String,
        required:true,
        unique:true
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    department:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
})

//JWT Token
employee.methods.getJwtToken=()=>{
    return jwt.sign({_id:this._id},process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPIRE});
}


module.exports=mongoose.model('employee',employee)