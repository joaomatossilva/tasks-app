const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user.js')
const Task = require('../../src/models/task.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Test user 1',
    email: 'kappy+testOne@acydburne.com.pt',
    password: 'passOne',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.AUTH_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Test user 2',
    email: 'kappy+testTwo@acydburne.com.pt',
    password: 'passTwo',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.AUTH_SECRET)
    }]
}


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task one for user one',
    userId: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task two for user one',
    completed: true,
    userId: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task three for user two',
    userId: userTwoId
}

const setupDatabase = async () => {
    await Task.deleteMany()
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}