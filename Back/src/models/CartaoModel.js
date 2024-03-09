class CartaoModel {
    constructor (objeto){
        this.numeroCartao = objeto.numeroCartao,
        this.nomeCliente = objeto.nomeCliente,
        this.bandeira = objeto.bandeira,
        this.cvv = objeto.cvv
    }
}

module.exports = CartaoModel;