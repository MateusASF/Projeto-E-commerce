// User.js
class User {
    constructor(nome, nascimento, genero, cpf, telefone, tipotelefone, senha, email, logradouro, tipoLogradouro, numero, bairro, cidade, estado, pais, cep, tipoResidencia, observacoes) {
        this.nome = nome;
        this.nascimento = nascimento;
        this.genero = genero;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipotelefone = tipotelefone;
        this.senha = senha;
        this.email = email;
        this.logradouro = logradouro;
        this.tipoLogradouro = tipoLogradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.cep = cep;
        this.tipoResidencia = tipoResidencia;
        this.observacoes = observacoes;
    }
}

module.exports = User;