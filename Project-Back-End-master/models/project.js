const mongoose = require('mongoose')
const Project1 = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    Technologies: {
        type: Array,
        required: true
    },
    Deadline: {
        type: Date,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    },
    UpdatedAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('project', Project1)