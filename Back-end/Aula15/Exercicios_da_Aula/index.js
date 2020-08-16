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
  let naoTem = false;
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
      console.log(`${chalk.blue('Tudo bem então! Agradecemos a sua visita e volte sempre!')}`)
      rl.close();
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
    } else {
      const totalPagar = valorCompra(nomeProduto, quantidade);
      informarTotal(nomeProduto, totalPagar);
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
      const totalPagar = valorCompra(nomeProduto, quantidade);
      informarTotal(nomeProduto, totalPagar);
    } else if (resposta == 2) {
      console.log(`${chalk.blue('Tudo bem então! Agradecemos a sua visita e volte sempre!')}`)
      rl.close();
    }
  })
}

// Calcular valor total da compra
const valorCompra = (nomeProduto, quantidade) => {
  let precoUnit, total;
  for (let i = 0; i < lojaDeRoupa.length; i++) {
    if (lojaDeRoupa[i].nome === nomeProduto) {
      precoUnit = lojaDeRoupa[i].preco;
      break;
    }
  }
  return total = (precoUnit * quantidade) / 100;
}

// Informar total da compra e perguntar se gostaria de efetuar o pagamento
const informarTotal = (nomeProduto, totalPagar) => {
  rl.question(`O valor total da compra é ${chalk.green(`R$ ${totalPagar.toFixed(2)}`)}. Gostaria de efetuar a compra?\n[1] para sim\n[2] para não\n`, (resposta) => { if (resposta == 1) {
      console.log(`${chalk.green('Obrigado pela preferência e volte sempre!')}`)
      rl.close();
    } else if (resposta == 2) {
      console.log(`${chalk.blue('Tudo bem então! Agradecemos a sua visita e volte sempre!')}`)
      rl.close();
    }
  });
}

iniciarAtendimento();