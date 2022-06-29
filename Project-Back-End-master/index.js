const mongoose=require('mongoose')
const envFile=require('dotenv/config')
const express=require("express")
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors({origin:'http://localhost:4200'}))
app.use(cookieParser())

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>{
    console.log('Database Connected')
})
.catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{
    res.json("Welcome to Employee Project tracking application !!")
})

const employeesRouter=require("./routers/employeesRoute")
app.use('/employee',employeesRouter)

const projectsRouter=require("./routers/projectsRoute")
app.use('/project',projectsRouter)

const timesheetRouter=require("./routers/timesheetsRoute")
app.use('/timesheet',timesheetRouter)

// const loginRouter=require("./routers/loginRoute")
// app.use('/login',loginRouter)

app.listen(process.env.PORT,()=>{
    console.log('Server is running at port :',process.env.PORT)
})