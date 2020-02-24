require('../src/db/mongoose.js')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5e53b2d93c618dca00012e80").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// })

const deleteAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

deleteAndCount("5e53b2d93c618dca00012e80").then((count) => {
    console.log(count)
})