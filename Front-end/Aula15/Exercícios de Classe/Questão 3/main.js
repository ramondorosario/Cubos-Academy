const button = document.querySelector('button');
const select = document.querySelector('select');
const label = document.querySelector('label > span');
const input = document.querySelector('input');

button.addEventListener('click', () => {
    if (select.value === 'telefone') {
        label.innerHTML = 'Telefone'
        input.setAttribute('type', 'number');
    } else if (select.value === 'email') {
        label.innerHTML = 'Email'
        input.setAttribute('type', 'email')
    }
})