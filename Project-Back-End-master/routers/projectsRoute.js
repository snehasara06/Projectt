const express2 = require('express')
const router1 = express2.Router()
const Project = require('../models/project')

router1.get('/', async (req, res) => {
    try {
        const project = await Project.find()
        res.json(project)
    }
    catch (err) {
        res.send(`Error : ${err}`)
    }
})

router1.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        res.json(project) 
    }
    catch (err) {
        res.send(`Error : ${err}`)
    }
})

router1.post('/', async (req, res) => {
    try {
        const project = new Project(req.body)
        await project.save()
        res.json(project)
    }
    catch (err) {
        res.send(`Error:${err}`)
    }
})

router1.put('/:id',async(req,res)=>{
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate=req.body;
        const project=await Project.findById({_id:idToUpdate}).updateOne(dataToUpdate);
        res.json(project)
    }
    catch (err) {
        res.send(`Error:${err}`)
    }
})

router1.delete('/:id', async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const project = await Project.deleteOne({ _id: idToDelete })
        res.json(project)
    }
    catch (err) {
        res.send(`Error : ${err}`)
    }
})

module.exports = router1;