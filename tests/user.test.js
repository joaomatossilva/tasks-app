const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')

const userOne = {
    name: 'Test user 1',
    email: 'kappy+testOne@acydburne.com.pt',
    password: 'passOne'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Test User',
            email: 'kappy@acydburne.com.pt',
            password: 'testPass123'
        })
        .expect(201)
})