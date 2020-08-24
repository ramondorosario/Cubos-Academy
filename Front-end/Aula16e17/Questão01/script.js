const form = document.querySelector('form');
const input = form.querySelector('input');

form.addEventListener('submit', event => {
  event.preventDefault()  
  const aFazer = document.querySelector('.a-fazer');
  const feito = document.querySelector('.feito');
  
  const tarefas = document.createElement('li');  
  const checkbox = document.createElement('input');  
  checkbox.setAttribute('type', 'checkbox');  
  const span = document.createElement('span');
  span.innerText = input.value;  
  const botaoDeletar = document.createElement('button');
  botaoDeletar.innerText = 'Deletar';
  
  
  tarefas.append(checkbox);
  tarefas.append(span);
  tarefas.append(botaoDeletar);    
  aFazer.append(tarefas);  
  
  checkbox.addEventListener('input', event => {
    if (checkbox.checked) {
      feito.append(tarefas);
    } else {
      aFazer.append(tarefas)
    }
  })
  
  botaoDeletar.addEventListener('click', event => {
    const botaoDeletar = event.target;
    const tarefas = botaoDeletar.closest('li')
    tarefas.remove();
  })
  input.value = '';
})