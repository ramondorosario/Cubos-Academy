const button = document.querySelector('button');
const div = document.querySelector('div');

button.addEventListener('click', (event) => {
  alert('clique botão!');
  event.stopPropagation();
})

div.addEventListener('click', () => {
  alert('clique div');
})