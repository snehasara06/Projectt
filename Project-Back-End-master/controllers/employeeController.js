const Employee = require('../models/employee')
const { ObjectId } = require('mongodb');
const { loginValidation, registerValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const employee = require('../models/employee');
const sendToken = require('../utils/jwtToken');


const getAllEmployees = async (req, res, next) => {
    let employee;
    try {
        employee = await Employee.find()
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    if (!employee) {
        return res.status(404).json({ message: "No employees found" })
    }
    return res.status(200).json(employee)
}

const getOneEmployee = async (req, res) => {
    let employee;
    try {
        employee = await Employee.findById(req.params.id)
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    if (!employee) {
        return res.status(404).json({ message: "No employee found" })
    }
    return res.status(200).json(employee)
}

const addEmployee = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(404).send(error.details[0].message)

    const existUser = await Employee.findOne({ employeeId: req.body.employeeId })
    if (existUser)
        return res.status(400).send('User already exists')

    const salt = await bcrypt.genSalt();
    //console.log(salt)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    let employee;
    try {
        employee = new Employee({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            employeeId: req.body.employeeId,
            emailId: req.body.emailId,
            department: req.body.department,
            role: req.body.role,
            password: hashPassword
        })
        //console.log(employee)
        await employee.save()
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }

    // const token = employee.getJwtToken();
    // return res.status(201).json({ success: true, employee, token })
    const message = "Successfully Registered";
    sendToken(employee, 200, res, message)


}

const loginEmployee = async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await employee.findOne({ employeeId: req.body.userId })
    if (!user)
        return res.status(401).send('Invalid Username')
    try {
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass)
            return res.status(401).send('Password is Incorrect')
    }
    catch (err) {
        return console.log(err)
    }

    const message = "Successfully Logged in";
    sendToken(user, 200, res, message)

}

const logoutEmployee = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    }
    catch (err) {
        return res.status(400).json({Error:err})
    }
    //console.log("success")
    res.status(200).json({ success: true, message: "Logged out" })

}

const updateEmployee = async (req, res) => {
    let employee;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate = req.body;
        employee = await Employee.findById({ _id: idToUpdate }).updateOne(dataToUpdate)
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }
    if (!employee) {
        return res.status(500).json({ message: "Unable to update employee" })
    }
    return res.status(200).json(employee)
}


const deleteEmployee = async (req, res) => {
    let employee;
    try {
        const idToDelete = req.params.id;
        Employee.findById({ _id: idToDelete })
        employee = await Employee.deleteOne({ _id: new ObjectId(idToDelete) }).clone();
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    if (!employee) {
        return res.status(500).json({ message: "Unable to delete" })
    }
    return res.status(200).json({ message: "Successfully deleted" })
}

module.exports = { getAllEmployees, getOneEmployee, addEmployee, updateEmployee, deleteEmployee, loginEmployee, logoutEmployee }