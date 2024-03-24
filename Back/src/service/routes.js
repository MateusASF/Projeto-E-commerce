const express = require('express');
const UserController = require('../controller/userController').UserController;

const router = express.Router();
const userController = new UserController();

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
module.exports = { router };