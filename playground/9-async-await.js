const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) {
                reject('numbers should be positive')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    var a = await(1, 1)
    return await add(a,-2)
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log('error', error)
})