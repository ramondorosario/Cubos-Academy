// ------------------- Exercícios de Classe -------------------
// Quetão 1
const agora = new Date();
console.log(agora);

// Questão 2
const ceiaNatalAnoPassado = new Date(2019, 11, 25, 21, 30);
console.log(ceiaNatalAnoPassado);

// Questão 3
const registros = [
  {
    name: "Kirkland",
    company: "ECLIPSENT",
    registered: "Mon Dec 07 2015 07:01:50 GMT+0000",
  },
  {
    name: "Elise",
    company: "ILLUMITY",
    registered: "Fri Mar 02 2018 11:37:56 GMT+0000",
  },
  {
    name: "Waters",
    company: "PERMADYNE",
    registered: "Tue Apr 09 2019 08:31:31 GMT+0000",
  },
  {
    name: "Tanner",
    company: "MIRACLIS",
    registered: "Wed Nov 14 2018 16:11:14 GMT+0000",
  },
  {
    name: "Knapp",
    company: "ENDIPIN",
    registered: "Sun Jul 30 2017 00:05:33 GMT+0000",
  },
  {
    name: "Beverly",
    company: "MYOPIUM",
    registered: "Thu Sep 07 2017 16:13:51 GMT+0000",
  },
  {
    name: "Mcfarland",
    company: "JASPER",
    registered: "Mon Sep 14 2020 10:02:15 GMT+0000",
  },
  {
    name: "Vaughan",
    company: "ULTRIMAX",
    registered: "Tue May 06 2014 00:08:34 GMT+0000",
  },
  {
    name: "Parker",
    company: "LUXURIA",
    registered: "Tue Jun 16 2020 14:13:29 GMT+0000",
  },
];

const compararDataEmTimestamp = (a, b) => {
  const dateA = new Date(a.registered);
  const timesTampA = +dateA;

  const dateB = new Date(b.registered);
  const timesTampB = +dateB;

  return dateA < dateB ? -1 : 1;
};

const registrosOrdenados = registros.sort(compararDataEmTimestamp);
console.log(registrosOrdenados);

// ------------------- Exercícios de Casa -------------------
// Questão 4
const verificarAbertura = (dados) => {
  const chegadaClieteTimesTamp = +dados;

  const aberturaLoja = new Date(+dados);
  aberturaLoja.setHours(8);
  aberturaLoja.setMinutes(0);
  const aberturaTimesTamp = +aberturaLoja;

  const fechamentoLoja = new Date(+dados);
  fechamentoLoja.setHours(18);
  fechamentoLoja.setMinutes(1);
  const fechamentoTimesTamp = +fechamentoLoja;

  if (
    chegadaClieteTimesTamp >= aberturaTimesTamp &&
    chegadaClieteTimesTamp < fechamentoTimesTamp
  ) {
    console.log(true);
  } else {
    console.log(false);
  }
};

const chegadaCliente = new Date(2020, 9, 05, 18);
verificarAbertura(chegadaCliente);

// Questão 5
const verificarAbertura = (dados) => {
  const chegadaClieteTimesTamp = +dados;
  const diaSemana = dados.getDay();

  const aberturaLoja = new Date(+dados);
  aberturaLoja.setHours(8);
  aberturaLoja.setMinutes(0);
  const aberturaTimesTamp = +aberturaLoja;

  const fechamentoLoja = new Date(+dados);
  fechamentoLoja.setHours(18);
  fechamentoLoja.setMinutes(1);
  const fechamentoTimesTamp = +fechamentoLoja;

  if (
    chegadaClieteTimesTamp >= aberturaTimesTamp &&
    chegadaClieteTimesTamp < fechamentoTimesTamp &&
    diaSemana !== 0 &&
    diaSemana !== 6
  ) {
    console.log(true);
  } else {
    console.log(false);
  }
};

const chegadaCliente = new Date(2020, 9, 05, 18);
verificarAbertura(chegadaCliente);

// Questão 6
const verificarAbertura = (dados) => {
  const chegadaClieteTimesTamp = +dados;
  const diaSemana = dados.getDay();

  const aberturaLoja = new Date(+dados);
  aberturaLoja.setHours(8);
  aberturaLoja.setMinutes(0);
  const aberturaTimesTamp = +aberturaLoja;

  const fechamentoLoja = new Date(+dados);
  fechamentoLoja.setHours(18);
  fechamentoLoja.setMinutes(1);
  let fechamentoTimesTamp = +fechamentoLoja;

  if (diaSemana !== 0 && diaSemana !== 6) {
    if (
      chegadaClieteTimesTamp >= aberturaTimesTamp &&
      chegadaClieteTimesTamp < fechamentoTimesTamp
    ) {
      console.log(true);
    } else {
      console.log(false);
    }
  } else if (diaSemana === 6) {
    fechamentoTimesTamp -= 1000 * 60 * 60 * 6;
    if (
      chegadaClieteTimesTamp >= aberturaTimesTamp &&
      chegadaClieteTimesTamp < fechamentoTimesTamp
    ) {
      console.log(true);
    } else {
      console.log(false);
    }
  } else {
    console.log(false);
  }
};

const chegadaCliente = new Date(2020, 9, 3, 11);
verificarAbertura(chegadaCliente);

// Questão 7
const inicioPromocao = new Date(2020, 9, 06);
const fimDaPromocao = +inicioPromocao + 1000 * 60 * 60 * 24 - 1000;

const verificarPromocao = (dados) =>
  console.log(
    +dados >= inicioPromocao && +dados <= fimDaPromocao ? true : false
  );

const pedidoCliente = new Date(2020, 9, 6, 10, 20);
verificarPromocao(pedidoCliente);

// Questão 8
const inicioPromocao = new Date(2020, 9, 06);
const fimDaPromocao = +inicioPromocao + 1000 * 60 * 60 * 24 * 30 - 1000;
console.log(inicioPromocao, new Date(fimDaPromocao));

const verificarPromocao = (dados) =>
  console.log(
    +dados >= inicioPromocao && +dados <= fimDaPromocao ? true : false
  );

const pedidoCliente = new Date(2020, 9, 6, 10, 20);
verificarPromocao(pedidoCliente);

// Questão 9
const formatarData = (data) => {
  console.log(
    data.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
};

formatarData(new Date());

// Questão 10
const formatarData = (data) => {
  console.log(
    data.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  );
};

formatarData(new Date());
