const mongoose = require('mongoose')

const MONGO_DB = process.env.MONGO_DB
mongoose.connect('mongodb://' + MONGO_DB + '/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
