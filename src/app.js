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


app.listen(port, () => {
    console.log('server is up on port ' + port)
})

// const jwt = require('jsonwebtoken')

// const func = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'my-super-duper-private-key', { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'my-super-duper-private-key')
//     console.log(data)
// }

// func()