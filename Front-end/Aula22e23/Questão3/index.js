const exibir = (tempo) => {
    new Promise((resolve) => {
        resolve();
    })
        .then(value => {
            setTimeout((value) => {
                console.log(value)
            }, tempo * 1000)
        })
}
exibir(1)