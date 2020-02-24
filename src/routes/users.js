const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(500).send(error)
    }
    
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    const user = req.user
    const token = req.token

    try {
        user.tokens = user.tokens.filter((item) => item.token !== token)
        await user.save()
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    const user = req.user

    try {
        user.tokens = []
        await user.save()
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))
    if (!isValidOperation) {
        res.status(400).send('invalid updates')
    }

    try {
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send('Error!')
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        req.user.remove()
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(400).send('Error!')
    }
})

module.exports = router