const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})


// const user = new User({ 
//     name: '    Joao   ',
//     email: '  joao@KSPACE.pt  ',
//     password: 'secret'
// })

// user.save().then(() => {
//     console.log(user)
//     mongoose.disconnect()
// }).catch((error) => {
//     console.log('error!', error)
//     mongoose.disconnect()
// })



// const task = new Task({description:'test task', completed: false})
// task.save().then(() => {
//     console.log('saved')

//     mongoose.disconnect()
// })

