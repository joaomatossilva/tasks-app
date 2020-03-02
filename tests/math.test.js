const math = require('../src/math.js')

test('Should calculate total with tip', () => {
    //Act
    var result = math.calculateTip(100, .1)

    //Assert
    expect(result).toBe(110)
})

test('Should calculate total with default tip', () => {
    //Act
    var result = math.calculateTip(100)

    //Assert
    expect(result).toBe(130)
})

test('Should convert 32 F to 0 C', () => {
    //Act
    var result = math.fahrenheitToCelsius(32)

    //Assert
    expect(result).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    //Act
    var result = math.celsiusToFahrenheit(0)

    //Assert
    expect(result).toBe(32)
})

// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
    
// })

test('Should add two number', (done) => {
    math.add(2, 3).then((result) => {
        expect(result).toBe(5)
        done()
    })
})

test('Should add two numbers async', async () => {
    const result = await math.add(256,256)
    expect(result).toBe(512)
})