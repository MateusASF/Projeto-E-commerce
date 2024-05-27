const express = require('express');
const UserController = require('../controller/userController').UserController;
const ProdutoController = require('../controller/produtoController').ProdutoController;
const CompraController = require('../controller/compraController').CompraController;

const router = express.Router();
const userController = new UserController();
const produtoController = new ProdutoController();
const compraController = new CompraController();

router.post('/cadastro', userController.handlePost);
router.get('/listar', userController.handleListar);
router.put('/inativar', userController.handleInativaUser);
router.put('/ativar', userController.handleAtivaUser);
router.put('/alterarSenha', userController.handleAlteraSenhaUser);
router.put('/alterarCliente', userController.handleAlteraCliente);
router.post('/filtrar', userController.handleFiltrar);
router.put('/alterarCartao', userController.handleAlteraCartao);
router.put('/alterarEndereco', userController.handleAlterarEndereco);
router.post('/adicionarEndereco', userController.handleAdicionarEndereco);
router.post('/adicionarCartao', userController.handleAdicionarCartao);
router.post('/excluirEndereco', userController.handleDeletarEndereco);
router.post('/excluirCartao', userController.handleDeletarCartao);
router.post('/buscarUsuario', userController.handleBuscarUsuario);
router.post('/login', userController.handleLogin);




router.get('/relogios', produtoController.handleListar);
router.put('/inativarProduto', produtoController.handleInativaProduto);
router.put('/ativarProduto', produtoController.handleAtivaProduto);



router.post('/finalizarCompra', compraController.registrarCompra); 
router.get('/listarVendasCompras', compraController.listarCompras);
router.post('/listarVendasComprasPorId', compraController.listarComprasPorId);
router.post('/atualizarStatusVendaCompra', compraController.atualizarStatusVendaCompra);
router.post('/listarVendasComprasComCod', compraController.listarComprasPorCodCompra);
router.post('/inserirTroca', compraController.inserirTroca);
router.get('/listarTrocas', compraController.listarTrocas);
router.post('/listarTrocasPorId', compraController.listarTrocasPorId);
router.post('/validarCupom', compraController.validarCupom);
router.post('/gerarCupom', compraController.gerarCupom);
router.post('/atualizarStatusTrocaDevolucao', compraController.atualizarStatusTrocaDevolucao);
router.get('/listarCupons', compraController.listarCupons);


module.exports = { router };