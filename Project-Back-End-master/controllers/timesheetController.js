const Timesheet = require('../models/timesheet')
const { ObjectId } = require('mongodb');

const getAllTimesheets=async (req, res,next) => {
    let timesheet;
    try {
        timesheet = await Timesheet.find()
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json(timesheet)
}

const getOneTimesheet=async (req, res) => {
    let timesheet;
    try {
        timesheet = await Timesheet.findById(req.params.id)
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json(timesheet)
}
 
const addTimesheet= async (req, res) => {
    let timesheet;
    try {
        timesheet = new Timesheet(req.body)
        await timesheet.save()
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }
    return res.status(200).json(timesheet)
}

const updateTimesheet=async(req,res)=>{
    let timesheet;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate=req.body;        
        timesheet=await Timesheet.findById({_id:idToUpdate}).updateOne(dataToUpdate)
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }
    return res.status(200).json(timesheet)
}


const deleteTimesheet=async (req, res) => {
    let timesheet;
    try {
        const idToDelete = req.params.id;
        timesheet = await Timesheet.deleteOne({_id:new ObjectId(idToDelete)}).clone();
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json({message:"Successfully deleted"})
}

module.exports = {getAllTimesheets,getOneTimesheet,addTimesheet,updateTimesheet,deleteTimesheet}