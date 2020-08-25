const button = document.querySelector('button');
const mensagem = document.querySelector('span');
const imagem = document.querySelector('img')
let abortar = false;
let id;
let cont = 10;

const contador = () => {
    mensagem.innerText = cont;
    cont--
    if (cont === -1) {
        clearInterval(id);
        mensagem.innerText = 'Lançamento iniciado!';
        imagem.setAttribute('src', 'imagens/f44.gif')
        button.innerText = 'Lançado...';
        button.setAttribute('disabled', 'true');
    }
}
const reiniciarLancamento = () => {
    abortar = false
    cont = 10;
}

button.addEventListener('click', () => {
    if (!abortar) {
        mensagem.innerText = 'Iniciando contagem!';
        button.innerText = 'Abortar missão!';
        id = setInterval(contador, 1000);
    } 
    if (abortar) {
        clearInterval(id)
        mensagem.innerText = 'Lançamento abortado...'
        button.innerText = 'Reiniciar lançamento';
        return reiniciarLancamento();
    }
    abortar = true;
})