const Validacoes = require('../strategy/Validacoes');
const ProdutoService = require('../service/produto/produtoService');


class ProdutoController {
    async handleListar(request, response) {
        const produtoService = new ProdutoService();
        const result = await produtoService.buscarRelogios();
        return response.json(result);
    }

    async handleInativaProduto(request, response) {
        const produtoService = new ProdutoService();
        const result = await produtoService.inativarProduto(request.body.id);

        return response.json(result);
    }

    async handleAtivaProduto(request, response) {
        const produtoService = new ProdutoService();
        const result = await produtoService.ativarProduto(request.body.id);

        return response.json(result);
    }
}
module.exports = { ProdutoController };