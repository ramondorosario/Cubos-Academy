const txtInput = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    const escolhido = txtInput.value;
    const selecionado = document.querySelectorAll(escolhido)
    
    if (selecionado[0].hasAttribute('style')) {
        for (let i = 0; i < selecionado.length; i++) {
            selecionado[i].removeAttribute('style')
        }
    } else {
        for (let i = 0; i < selecionado.length; i++) {
            selecionado[i].style.border = 'red solid 1px'
        }
    }
})