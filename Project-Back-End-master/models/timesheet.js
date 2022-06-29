const mongoose = require('mongoose')
const Timesheet1 = new mongoose.Schema({
    project_name: {
        type:String,
        // ref:"project",
        required:true
    },
    date: {
        type: Date,
        required:true
    },
    timesheet_name:{
        type:String,
        required:true
    },
    addedBy: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    duration: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('timesheet', Timesheet1)
