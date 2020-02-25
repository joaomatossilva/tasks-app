const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task.js')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
            {
                throw new Error('email is not a valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid Password value')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user)     {
        throw Error("Invalid Credentials")
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw Error("Invalid Credentials")
    }

    return user
}

schema.methods.generateAuthToken = async function() {
    const user = this
    var { _id, name, email } = user
    var token = jwt.sign({ _id: _id.toString(), name, email}, 'my-super-duper-private-key', { expiresIn: '1 day'})
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token;
}

schema.methods.toJSON = function() {
    const { _id, name, email, age } = this
    return { _id, name, email, age }
}

schema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userId'
})

//hash the plain text password
schema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

schema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ userId: user._id})
    next()
})

const User = mongoose.model('User', schema)

module.exports = User