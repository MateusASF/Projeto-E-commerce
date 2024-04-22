const Validacoes = require('../strategy/Validacoes');
const CompraService = require('../service/compra/compraService');


class CompraController {
    async registrarCompra(req, res) {
        // const { carrinho, cartoes, enderecoEntrega, total, frete, cupom, status } = req.body;
        // const compra = { carrinho, cartoes, enderecoEntrega, total, frete, cupom, status, codCompra };
        
        const compraService = new CompraService();
        // const validacoes = new Validacoes();
        // const erros = validacoes.validarCompra(compra);
        // if (erros.length > 0) {
        //     return res.status(400).json({ erros });
        // }
        try {
            await compraService.inserirCompra(req.body);
            res.status(201).json({ mensagem: 'Compra registrada com sucesso.' });
        } catch (error) {
            console.error('Erro ao registrar compra:', error.message);
            res.status(500).json({ mensagem: 'Erro ao registrar compra.' });
        }
    }

    async listarCompras(req, res) {
        const compraService = new CompraService();
        try {
            const compras = await compraService.listarCompras();
            res.status(200).json(compras);
        } catch (error) {
            console.error('Erro ao listar compras:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar compras.' });
        }
    }

    async listarComprasPorId(req, res) {
        const compraService = new CompraService();
        try {
            const compras = await compraService.listarComprasPorId(req.body.id);
            res.status(200).json(compras);
        } catch (error) {
            console.error('Erro ao listar compras:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar compras.' });
        }
    }

    async atualizarStatusVendaCompra(req, res) {
        const compraService = new CompraService();
        try {
            await compraService.atualizarStatusVendaCompra(req.body.id, req.body.status);
            res.status(200).json({ mensagem: 'Status da compra atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar status da compra:', error.message);
            res.status(500).json({ mensagem: 'Erro ao atualizar status da compra.' });
        }
    }
}
module.exports = { CompraController };