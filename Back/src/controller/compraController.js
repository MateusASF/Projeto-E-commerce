const Validacoes = require('../strategy/Validacoes');
const CompraService = require('../service/compra/compraService');


class CompraController {
    async registrarCompra(req, res) {
        // const { carrinho, cartoes, enderecoEntrega, total, frete, status } = req.body;
        // const compra = { carrinho, cartoes, enderecoEntrega, total, frete, status, codCompra };
        
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
    async atualizarStatusTrocaDevolucao(req, res) {
        const compraService = new CompraService();
        try {
            await compraService.atualizarStatusTrocaDevolucao(req.body.id, req.body.status);
            res.status(200).json({ mensagem: 'Status da troca atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar status da troca:', error.message);
            res.status(500).json({ mensagem: 'Erro ao atualizar status da compra.' });
        }
    }

    async listarComprasPorCodCompra(req, res) {
        const compraService = new CompraService();
        try {
            const compras = await compraService.listarComprasPorCodCompra(req.body.codCompra);
            res.status(200).json(compras);
        } catch (error) {
            console.error('Erro ao listar compras:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar compras.' });
        }
    }

    async inserirTroca(req, res) {
        const compraService = new CompraService();
        try {
            await compraService.inserirTroca(req.body);
            res.status(201).json({ mensagem: 'Troca registrada com sucesso.' });
        } catch (error) {
            console.error('Erro ao registrar troca:', error.message);
            res.status(500).json({ mensagem: 'Erro ao registrar troca.' });
        }
    }

    async listarTrocas(req, res) {
        const compraService = new CompraService();
        try {
            const trocas = await compraService.listarTrocas();
            res.status(200).json(trocas);
        } catch (error) {
            console.error('Erro ao listar trocas:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar trocas.' });
        }
    }

    async listarTrocasPorId(req, res) {
        const compraService = new CompraService();
        try {
            const trocas = await compraService.listarTrocasPorId(req.body.id);
            res.status(200).json(trocas);
        } catch (error) {
            console.error('Erro ao listar trocas:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar trocas.' });
        }
    }

    async validarCupom(req, res) {
        const compraService = new CompraService();
        try {
            const cupom = await compraService.validarCupom(req.body.cupom);
            res.status(200).json(cupom);
        } catch (error) {
            console.error('Erro ao validar cupom:', error.message);
            res.status(500).json({ mensagem: 'Erro ao validar cupom.' });
        }
    }

    async gerarCupom(req, res) {
        const compraService = new CompraService();
        try {
            const cupom = await compraService.gerarCupom(req.body);
            res.status(201).json(cupom);
        } catch (error) {
            console.error('Erro ao gerar cupom:', error.message);
            res.status(500).json({ mensagem: 'Erro ao gerar cupom.' });
        }
    }

    async listarCupons(req, res) {
        const compraService = new CompraService();
        try {
            const cupons = await compraService.listarCupons();
            res.status(200).json(cupons);
        } catch (error) {
            console.error('Erro ao listar cupons:', error.message);
            res.status(500).json({ mensagem: 'Erro ao listar cupons.' });
        }
    }
}
module.exports = { CompraController };