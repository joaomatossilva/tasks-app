const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1,2).then((result) => {
    console.log(result)
    return add(5, result)
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})