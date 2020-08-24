const input = document.querySelector('input');
const button = document.querySelector('button');
const alterar = input;

button.addEventListener('click', () => {   
    if(alterar.hasAttribute('type', 'password')) {
        input.removeAttribute('type', 'password');
    } else {
        alterar.setAttribute('type', 'password');
    }
})