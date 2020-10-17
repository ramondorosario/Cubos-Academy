import React from 'react';

const gerarDataValida = (periodo) => {
	const [dia, mes, ano] = periodo.split('/');
	if (!dia || !mes || !ano) return new Date(NaN);

	return new Date(Number(ano), Number(mes) - 1, Number(dia));
};

const validarData = (data) => {
	return !Number.isNaN(data.valueOf());
};

export default ({ labelDescricao, periodo, setPeriodo }) => {
	const dataPeriodo = periodo && gerarDataValida(periodo);
	const erroData =
		dataPeriodo && !validarData(dataPeriodo) ? 'Data inválida' : '';

	return (
		<div className="label">
			<label>
				{labelDescricao}
				<input
					value={periodo}
					onInput={(e) => {
						setPeriodo(e.target.value);
					}}
				/>
				{erroData ? <div className="erro">{erroData}</div> : ''}
			</label>
		</div>
	);
};
