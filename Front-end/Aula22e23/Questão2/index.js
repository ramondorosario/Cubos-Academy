new Promise((resolve) => {
    resolve()
})
    .then((value) => {
        setTimeout(() => {
            console.log(value);
        }, 1000)
    })