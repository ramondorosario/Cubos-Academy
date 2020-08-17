/*
  Não altere nada ABAIXO disso até o próximo comentário;

  -- Este código permite que tenhamos uma 
  -- experiência interativa com o usuário;
  -- Não é necessário entendê-lo neste momento.
*/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  Não altere nada ACIMA deste comentário;;
*/

/**
 * Escreva seu código aqui embaixo;
 */

const chalk = require('chalk');
const { loadavg } = require("os");
const lojaDeRoupa = [
  {
    nome: 'camisa',
    preco: 3000,
    qtd: 5
  },
  {
  nome: 'bermuda',
  preco: 4500,
  qtd: 3
  },
  {
    nome: 'calça',
    preco: 7990,
    qtd: 2
  },
  {
    nome: 'casaco',
    preco: 12990,
    qtd: 4
  },
  {
    nome: 'cinto',
    preco: 3990,
    qtd: 2
  }
]

let sacola = [];

// Iniciar o atendimento!
const iniciarAtendimento = () => {
  perguntarProduto();
};

// Perguntar o nome do produto
const perguntarProduto = () => {
  rl.question('O que você gostaria de comprar? ', (nomeProduto) => {
    buscarProduto(nomeProduto);
  });
}

// Verificar se tem o produto na loja
const buscarProduto = (nomeProduto) => {
  for (let i = 0; i < lojaDeRoupa.length; i++){
    if (nomeProduto === lojaDeRoupa[i].nome) {
      console.log(`Yay! Temos o seu produto ${chalk.green(nomeProduto)}.`)
      return perguntarQuantidade(nomeProduto);
    }
  }
  querContinuar(nomeProduto)
}

// Caso não tenha o produto informado, perguntar se gostaria de continuar ou encerrar o atendimento
const querContinuar = (nomeProduto) => {
  console.log(`Não temos o produto ${chalk.red(nomeProduto)}`)
  rl.question('Gostaria de verificar um novo produto?\n[1] para sim \n[2] para não\n', (resposta) => {
    if (resposta == 1) {
      perguntarProduto();
    } else if (resposta == 2) {
      comoPossoAjudar(nomeProduto)
    }
  })    
}

// Perguntar a quantidade do produto e verificar se tem estoque, caso verdadeiro vai informar o valor da compra
const perguntarQuantidade = (nomeProduto) => {
  rl.question('Quantas você vai querer? ', (quantidade) => {
    const estoque = verificarQuantidade(nomeProduto);
    if (quantidade > estoque) {
      console.log(`Infelizmente não temos essa quantidade. No momento temos ${chalk.red(estoque)} em estoque`);
      novaPergunta(nomeProduto, estoque);
    } else if (quantidade <= estoque) {
      console.log(`${chalk.green('Temos essa quantidade disponível!')}`);
      comoPossoAjudar(nomeProduto, quantidade);
    }
  });
}

// Verificar a quantidade do produto selecionado em estoque
const verificarQuantidade = (nomeProduto) => {
  for (let i = 0; i < lojaDeRoupa.length; i++) {
    if (lojaDeRoupa[i].nome === nomeProduto) {
      return lojaDeRoupa[i].qtd;
    }
  }
}

// Se não houver a quantidade solicitada, informar quantidade no estoque e perguntar se gostaria de comprar todo estoque
const novaPergunta = (nomeProduto, quantidade) => {
  rl.question('Gostaria de levar a quantidade que temos em estoque?\n[1] para sim \n[2] para não\n', (resposta) => {
    if (resposta == 1) {
      comoPossoAjudar(nomeProduto, quantidade);
    } else if (resposta == 2) {
      console.log(`${chalk.blue(`Tudo bem então! ${comoPossoAjudar(nomeProduto, quantidade)}`)}`);
      rl.close();
    }
  })
}

// Perguntar como pode ajudar e dar opções do que o cliente pode fazer.
const comoPossoAjudar = (nomeProduto, quantidade) => {
  rl.question('Em que posso ajudar agora?\n[1] Continuar comprando\n[2] Finalizar pedido\n', (resposta) => {
    if(resposta == 1) {
      if(quantidade > 0) {
        console.log(chalk.green('Produto adicionado à sacola!'))
        adicionarSacola(nomeProduto, quantidade);
        perguntarProduto();
      } else {
        perguntarProduto()
      }      
    } else if (resposta == 2) {
      adicionarSacola(nomeProduto, quantidade)
      finalizarPedido();
    }
  })
}

// Adicionar item a sacola
const adicionarSacola = (nomeProduto, quantidade) => {
  for(let i = 0; i < lojaDeRoupa.length; i++) {
    if(lojaDeRoupa[i].nome === nomeProduto) {
      sacola.push(
        {
          nome: lojaDeRoupa[i].nome,
          qtd: quantidade,
          precoUnit: lojaDeRoupa[i].preco
        }
      )
    }
  }
  console.log(sacola)
}

const finalizarPedido = () => {
  let totalPedido = 0;
  console.log(chalk.yellow(`--------Itens na Sacola--------`))
  for (let i = 0; i < sacola.length; i++) {    
    console.log(`${chalk.blue('\nNome do produto:')} ${sacola[i].nome}`)
    console.log(`${chalk.blue('Quantidade:')} ${sacola[i].qtd}\n`)
    totalPedido += (sacola[i].qtd * sacola[i].precoUnit)
  }
  console.log(chalk.yellow(`-------------------------------`))
  
  rl.question(`Valor total da compra ${chalk.green(`R$ ${(totalPedido / 100).toFixed(2)}`)}.\nO que gostaria de fazer?\n[1] Fazer o pagamento\n[2] Cancelar a compra\n`, (resposta) => {
    if(resposta == 1) {
      console.log(chalk.green('Agradecemos a preferência! Volte sempre!'));
    } else if (resposta == 2) {
      console.log(chalk.red('Tudo bem, estamos à disposição. Volte sempre!'));
    }
    rl.close();
  })
}

iniciarAtendimento();