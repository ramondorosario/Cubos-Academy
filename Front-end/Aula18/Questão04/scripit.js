const input = document.querySelector('input');
const button = document.querySelector('button');
const alterar = input;

input.addEventListener('focus', event => {
    input.setAttribute('type', 'password')
})

input.addEventListener('blur', event => {
    input.removeAttribute('type', 'password')
})