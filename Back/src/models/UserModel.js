const adress = require('./EnderecoModel');
const tel = require('./TelefoneModel');
const card = require('./CartaoModel');

// User.js
class UserModel {
    constructor(nome, nascimento, genero, cpf, telefones, senha, email, enderecos, cartoes) {
        this.nome = nome;
        this.nascimento = nascimento;
        this.genero = genero;
        this.cpf = cpf;
        this.telefones = telefones.map(telefone => new tel(telefone));
        this.senha = senha;
        this.email = email;
        this.enderecos = enderecos.map(endereco => new adress(endereco));
        this.cartoes = cartoes.map(cartao => new card(cartao));
    }
}

module.exports = UserModel;