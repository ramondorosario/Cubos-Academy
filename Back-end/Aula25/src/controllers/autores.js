/* eslint-disable camelcase */
const crypto = require('crypto');
const imprimir = require('../utils/response');
const autores = require('../repositories/autores');
const posts = require('../repositories/posts');
const Email = require('../utils/email');

/** Cria um autor */
const criarAutor = async (ctx) => {
	const listaAutores = await autores.obterAutores();
	if (!listaAutores)
		return imprimir(
			ctx,
			200,
			'não existe tabela de autores cadastradas no banco de dados'
		);

	const { hash } = ctx.state;

	const {
		primeiro_nome = null,
		ultimo_nome = null,
		email = null,
	} = ctx.request.body;

	if (!primeiro_nome || !ultimo_nome || !email)
		return imprimir(ctx, 400, 'requisição mal formatada');

	const autorEncontrado = listaAutores.filter(
		(a) => a.email === email && !a.deletado
	);
	if (autorEncontrado[0])
		return imprimir(
			ctx,
			401,
			'já existe um autor cadastrado com o email informado'
		);

	const codigoVerificacao = crypto.randomBytes(20).toString('hex');

	const autor = {
		primeiro_nome,
		ultimo_nome,
		email,
		senha: hash,
		codigoVerificacao,
	};

	const autorCriado = await autores.criarAutor(autor);
	const { senha, codigo_verificacao, ...dados } = autorCriado;

	await Email.enviarEmail(
		email,
		'Cadastro na Cubos Academy Blogosfera',
		'<b>Parabéns! Agora você faz parte da maior plataforma de blogs dentro de Cubos Academy</b>'
	);

	await Email.enviarEmail(
		email,
		'Confirmação de email',
		`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta name="viewport" content="width=device-width" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Actionable emails e.g. reset password</title>
	<link href="styles.css" media="all" rel="stylesheet" type="text/css" />

		<style>
			a {
				color: #348eda;
				text-decoration: underline;
			}
		
			.btn-primary {
				text-decoration: none;
				color: #FFF;
				background-color: #348eda;
				border: solid #348eda;
				border-width: 10px 20px;
				line-height: 2em;
				/* 2em * 14px = 28px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
				/*line-height: 28px;*/
				font-weight: bold;
				text-align: center;
				cursor: pointer;
				display: inline-block;
				border-radius: 5px;
				text-transform: capitalize;
			}
		</style>
	</head>
	
	<body itemscope itemtype="http://schema.org/EmailMessage">
	
	<table class="body-wrap">
		<tr>
			<td></td>
			<td class="container" width="600">
				<div class="content">
					<table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction">
						<tr>
							<td class="content-wrap">
								<meta itemprop="name" content="Confirm Email"/>
								<table width="100%" cellpadding="0" cellspacing="0">
									<tr>
										<td class="content-block">
											Por favor, confirme seu endereço de e-mail clicando no link abaixo.
										</td>
									</tr>
									<tr>
										<td class="content-block">
											Podemos precisar enviar-lhe informações críticas sobre nosso serviço e é importante que tenhamos um endereço de e-mail correto.
										</td>
									</tr>
									<tr>
										<td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
											<a href="http://localhost:8081/autores/${autorCriado.id}/confirm/${codigo_verificacao}" class="btn-primary" itemprop="url" onclick="() => {alert('teste')}">Confirme seu email</a>
										</td>
									</tr>
									<tr>
										<td class="content-block">
											&mdash; The Mailgunners
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
					<div class="footer">
						<table width="100%">
							<tr>
								<td class="aligncenter content-block">Follow <a href="http://twitter.com/mail_gun">@Mail_Gun</a> on Twitter.</td>
							</tr>
						</table>
					</div></div>
			</td>
			<td></td>
		</tr>
	</table>
	
	</body>
	</html>`
	);

	return imprimir(ctx, 201, 'autor criado', 'autor', dados);
};

/** Confirmar email */
const confirmarEmail = async (ctx) => {
	const { id, code } = ctx.params;

	const autor = await autores.obterAutor(id);
	if (autor.verificado) return imprimir(ctx, 401, 'email já confirmado');

	await autores.confirmarEmail(id, code);
	return imprimir(ctx, 200, 'email confirmado');
};

/** Atualiza os dados de um autor */
const atualizarAutor = async (ctx) => {
	const { id } = ctx.params;
	let autor = await autores.obterAutor(id);

	const novasInformacoes = ctx.request.body;

	if (autor) {
		if (!autor.deletado) {
			// Se o autor não estiver deletado, poderá sofrer atualização
			if (
				novasInformacoes.id !== undefined ||
				novasInformacoes.deletado !== undefined
			) {
				// propriedade id e deletado, não pode ser modificado
				imprimir(ctx, 401, 'Id ou Deletado não pode sofrer alteração');
				return;
			}
			if (novasInformacoes.email !== undefined) {
				await autores.atualizarAutor(
					id,
					'email',
					novasInformacoes.email
				);
			}
			if (novasInformacoes.senha !== undefined) {
				await autores.atualizarAutor(
					id,
					'senha',
					novasInformacoes.senha
				);
			}
			if (novasInformacoes.primeiro_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'primeiro_nome',
					novasInformacoes.primeiro_nome
				);
			}
			if (novasInformacoes.ultimo_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'ultimo_nome',
					novasInformacoes.ultimo_nome
				);
			}

			autor = await autores.obterAutor(id);
			const { senha, codigo_verificacao, ...dados } = autor;

			imprimir(ctx, 200, 'autor atualizado', 'autor', dados);
		} else imprimir(ctx, 401, 'autor foi deletado');
	} else {
		imprimir(ctx, 404, 'autor não encontrado');
	}
};

/** Exibe um autor através da id escolhida na criação */
const exibirAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) imprimir(ctx, 400, 'requisição mal formatada');

	const autor = await autores.obterAutor(id);
	const { senha, codigo_verificacao, ...dados } = autor;

	if (!autor) return imprimir(ctx, 404, 'autor não encontrado');

	return imprimir(ctx, 200, 'autor econtrado', 'autor', dados);
};

/** Exibe todos os autores */
const exibirAutores = async (ctx) => {
	let listaAutores = await autores.obterAutores();

	listaAutores = listaAutores.map((x) => {
		let resultado;
		if (!x.deletado) {
			const { senha, codigo_verificacao, ...dados } = x;
			resultado = dados;
		}
		return resultado;
	});

	imprimir(ctx, 200, 'autores encontrados', 'autores', listaAutores);
};

/** Deleta um autor através do id informado */
const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const autor = await autores.obterAutor(id);

		if (autor) {
			if (autor.deletado) {
				return imprimir(ctx, 401, 'autor já se encontra deletado');
			}
			const resultado = await autores.deletarAutor(id);
			const { senha, codigo_verificacao, ...dados } = resultado;

			await posts.deletarPostsAutor(autor.id);
			return imprimir(ctx, 200, 'autor deletado', 'autor', dados);
		}
	}
	return imprimir(ctx, 404, 'autor não encontrado');
};

module.exports = {
	criarAutor,
	confirmarEmail,
	atualizarAutor,
	exibirAutor,
	exibirAutores,
	deletarAutor,
};
