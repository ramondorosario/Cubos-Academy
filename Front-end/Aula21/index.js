const form = document.querySelector('form');
const input = document.querySelector('.input-tarefa');
const checkboxAll = document.querySelector('.checkbox');
const contadorDeTarefas = document.querySelector('div > span');
const buttons = document.querySelectorAll('button');

const botaoTodas = document.querySelector('.botao-todas');
const botaoAFazer = document.querySelector('.botao-aFazer');
const botaoCompletas = document.querySelector('.botao-completas');
const botaoLimparCompletas = document.querySelector('.botao-limparCompletas');

const afazer = document.querySelector('.a-fazer');
const completas = document.querySelector('.completas');

function atualizarContador () {
    const qtdAfazer = afazer.querySelectorAll('li').length; 
    qtdAfazer == 1 ? contadorDeTarefas.innerText = `1 item a fazer` : contadorDeTarefas.innerText = `${qtdAfazer} itens a fazer`;
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const tarefas = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    const texto = document.createElement('span');
    texto.innerText = input.value;

    const botaoDeletar = document.createElement('button');
    botaoDeletar.innerText = 'Deletar'
    botaoDeletar.addEventListener('click', event => {
        const botao = event.target;
        const botaoDeletar = botao.closest('li');
        botaoDeletar.remove();
        atualizarContador();
    })
    
    tarefas.append(checkbox);
    tarefas.append(texto);
    tarefas.append(botaoDeletar);
    afazer.append(tarefas);

    checkbox.addEventListener('input', event => {
        checkbox.checked ? completas.append(tarefas) : afazer.append(tarefas);
        atualizarContador();
    })    
    
    atualizarContador();
    input.value = '';    
})

afazer.removeAttribute('hidden');
completas.removeAttribute('hidden')

checkboxAll.addEventListener('input', event => {  
    const qtdAfazer = afazer.querySelectorAll('li').length;
    const qtdCompletas = completas.querySelectorAll('li').length;

    if (qtdAfazer === 0 && qtdCompletas != 0) {
        const lista = completas.querySelectorAll('ul > *');
        for(item of lista) {
            item.querySelector('input').checked = false;
            afazer.append(item)
        }
    } else if (qtdAfazer != 0 && qtdCompletas >= 0) {
        const lista = afazer.querySelectorAll('ul > *');
        for (item of lista) {
            item.querySelector('input').checked = true;
            completas.append(item)
        }
    }    
    atualizarContador();
})

botaoTodas.addEventListener('click', () => {    
    for(botao of buttons) botao.classList.remove('marcar');
    botaoTodas.classList.add('marcar');

    afazer.removeAttribute('hidden');
    completas.removeAttribute('hidden');
    atualizarContador();
})

botaoAFazer.addEventListener('click', () => {
    for(botao of buttons) botao.classList.remove('marcar');
    botaoAFazer.classList.add('marcar');

    afazer.removeAttribute('hidden');
    completas.setAttribute('hidden', '');
    atualizarContador();
})

botaoCompletas.addEventListener('click', () => {
    for(botao of buttons) botao.classList.remove('marcar');
    botaoCompletas.classList.add('marcar');

    afazer.setAttribute('hidden', '');
    completas.removeAttribute('hidden');
    atualizarContador()
})

botaoLimparCompletas.addEventListener('click', () => {
    for(botao of buttons) botao.classList.remove('marcar');
    botaoLimparCompletas.classList.add('marcar');

    const total = completas.querySelectorAll('li');
    for (item of total) {
        item.remove();
    }
    atualizarContador();
    checkboxAll.checked = false;
})