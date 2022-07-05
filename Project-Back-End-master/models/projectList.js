const mongoose = require('mongoose')
const Project = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('projectList', Project)