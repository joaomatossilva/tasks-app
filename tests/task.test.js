const request = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/task.js')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db.js')

beforeEach(async () => {
    await setupDatabase()
})

test('Should be able to create task', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "My test task"
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
    expect(task.userId.toString()).toBe(userOneId.toString())
})

test('Should be able to get all tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})