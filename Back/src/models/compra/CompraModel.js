class CompraModel {
    constructor (objeto){
        enderecoEntrega = objeto.enderecoEntrega,
        carrinho = objeto.carrinho,
        total = objeto.total,
        frete = objeto.frete,
        cupom = objeto.cupom,
        status = objeto.status,
        codCompra = objeto.codCompra,
        cartoes = objeto.cartoes
    }
}

module.exports = CompraModel;