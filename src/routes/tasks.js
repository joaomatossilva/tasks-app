const express = require('express')
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        userId: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const options = {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort: {}
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            options.sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        console.log(options)
        
        const query = {
            userId: req.user._id
        }
        if (req.query.description) {
            query.description = req.query.description
        }
        if (req.query.completed) {
            query.completed = req.query.completed === 'true'
        }
        const tasks = await Task.find(query, null, options)
        res.send(tasks)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id:req.params.id, userId: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))
    if (!isValidOperation) {
        res.status(400).send('invalid updates')
    }


    try {
        const task = await Task.findOne({ _id:req.params.id, userId: req.user._id})
        
        if (!task) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        var task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id})
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