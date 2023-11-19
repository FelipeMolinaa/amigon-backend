CREATE TABLE usuario (
    idUsuario SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE paciente (
    idPaciente SERIAL PRIMARY KEY,
    idUsuario SERIAL REFERENCES usuario(idUsuario),
    emoji VARCHAR(1),
    sexo VARCHAR(10),
    dataNascimento DATE,
    nomeCompleto VARCHAR(255),
    anotacoesMedicas TEXT
);

CREATE TABLE tipoConsulta (
    idTipoConsulta SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    frequenciaMes INT,
    sexoPaciente INT,
    faixaEtariaMin INT,
    faixaEtariaMax INT
);

CREATE TABLE consulta (
    idConsulta SERIAL  PRIMARY KEY,
    idPessoa SERIAL  REFERENCES paciente(idPaciente),
    idTipoConsulta SERIAL  REFERENCES tipoConsulta(idTipoConsulta),
    doutor VARCHAR(255),
    hospital VARCHAR(255),
    endereco VARCHAR(255),
    dataAgendada DATE
);