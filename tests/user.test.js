const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db.js')

beforeEach(async () => {
    await setupDatabase()
})

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Test User',
            email: 'kappy@acydburne.com.pt',
            password: 'testPass123'
        })
        .expect(201)

    //Assert database was changed
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assert about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Test User',
            email: 'kappy@acydburne.com.pt'
        },
        token: user.tokens[0].token
    })

    //Assert password is not clear text
    expect(user.password).not.toBe('testPass123')
})

test('Should login an existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login a non existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'kappy+notexisting@acydburne.com.pt',
            password: 'passOneInvalid'
        })
        .expect(400)
})

test('Should not login an invalid password', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'passNotExists'
        })
        .expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get user profile for unauthenticated users', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should remove user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(204)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not remove user profile for unauthenticated users', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should allow Update user data', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'New name',
            age: 17
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toMatchObject({
        name: 'New name',
        age: 17
    })
})

test('Should not allow Update user invalid data', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'location'
        })
        .expect(400)
})