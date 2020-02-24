require('../src/db/mongoose.js')
const User = require('../src/models/user')



const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age: age })
    return User.countDocuments({ age: age })
}


updateAgeAndCount("5e53b9099a556cc2283965ed", 2).then((count) => {
    console.log(count)
})