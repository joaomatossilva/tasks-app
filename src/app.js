const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routes/users.js')
const taskRouter = require('./routes/tasks.js')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//routes
app.use(userRouter)
app.use(taskRouter)

module.exports = app