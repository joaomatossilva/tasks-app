const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)

        const decoded = jwt.verify(token, 'my-super-duper-private-key')
        
        //validate if the token has been revoked
        const user = await User.findOne({ _id: decoded._id , 'tokens.token': token})
        if(!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).send({error: 'Unauthorized'})
    }
}

module.exports = auth