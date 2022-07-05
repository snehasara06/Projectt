const Project = require('../models/project')
const { ObjectId } = require('mongodb');

const getAllProjects = async (req, res, next) => {
    let project;
    try {
        project = await Project.find()
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json(project)
}

const getOneProject = async (req, res) => {
    let project;
    try {
        const idToFind = req.params.id;
        project = await Project.findById({ _id: (idToFind) })
        //console.log(project)
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json(project)
}

const addProject = async (req, res) => {
    let project;
    try {
        project = new Project(req.body)
        await project.save()
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }
    return res.status(200).json(project)
}

const updateProject = async (req, res) => {
    let project;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate = req.body;
        project = await Project.findById({ _id: idToUpdate }).updateOne(dataToUpdate)
    }
    catch (err) {
        return console.log(`Error:${err}`)
    }
    return res.status(200).json(project)
}


const deleteProject = async (req, res) => {
    let project;
    try {
        const idToDelete = req.params.id;
        project = await Project.deleteOne({ _id: new ObjectId(idToDelete) }).clone();
    }
    catch (err) {
        return console.log(`Error : ${err}`)
    }
    return res.status(200).json({ message: "Successfully deleted" })
}

module.exports = { getAllTimesheets, getOneTimesheet, addTimesheet, updateTimesheet, deleteTimesheet }