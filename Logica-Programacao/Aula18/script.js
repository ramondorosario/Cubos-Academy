const button = document.querySelector('button');  

button.addEventListener('click', () => {
    const pessoa = document.querySelectorAll('input');
    
    const dadosPessoas = {
        nome: pessoa[0].value,
        idade: pessoa[1].value,
        cpf: pessoa[2].value,
        email: pessoa[3].value,
        telefone: pessoa[4].value
    }

    const guardarDados = JSON.stringify(dadosPessoas);
    localStorage.setItem('pessoa', guardarDados);

    location.href = 'pessoa.html'
})