const mongoose = require('mongoose')

const MONGO_DB = process.env.MONGO_DB
mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true
})
