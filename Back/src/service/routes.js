const express = require('express');
const UserController = require('../controller/userController').UserController;

const router = express.Router();
const userController = new UserController();

router.post('/cadastro', userController.handlePost);
router.get('/listar', userController.handleListar);
router.put('/inativar', userController.handleInativaUser);
router.put('/ativar', userController.handleAtivaUser);
router.put('/alterarSenha', userController.handleAlteraSenhaUser);
module.exports = { router };