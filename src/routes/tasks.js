const express = require('express')
const Task = require('../models/task.js')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        var task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        console.log(task)
        res.send(task)
    } catch (error) {
        console.log('hitting here')
        console.log(error)
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))
    if (!isValidOperation) {
        res.status(400).send('invalid updates')
    }


    try {
        const task = await Task.findById(req.params.id)
        
        if (!task) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        console.log('hitting here')
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        var task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router