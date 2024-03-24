
class EnderecoModel {
    constructor(objeto){
        this.logradouro = objeto.logradouro;
        this.tipoLogradouro = objeto.tipoLogradouro;
        this.numero = objeto.numero;
        this.bairro = objeto.bairro;
        this.cidade = objeto.cidade;
        this.estado = objeto.estado;
        this.pais = objeto.pais;
        this.cep = objeto.cep;
        this.tipoResidencia = objeto.tipoResidencia;
        this.observacoes = objeto.observacoes;
        this.identificacao = objeto.identificacao;
        this.tipoEndereco = objeto.tipoEndereco;
    }
}

module.exports = EnderecoModel;