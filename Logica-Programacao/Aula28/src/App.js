import './styles.css';
import React from 'react';

import Label from './components/input-label';

export default function () {
	const [inicio, setInicio] = React.useState();
	const [retorno, setRetorno] = React.useState();

	return (
		<div className="app">
			<Label
				labelDescricao="Inicio"
				periodo={inicio}
				setPeriodo={setInicio}
			/>
			<Label
				labelDescricao="Retorno"
				periodo={retorno}
				setPeriodo={setRetorno}
			/>
		</div>
	);
}
