const User = require('../models/UserModel');
const UserService = require('../service/user/userService');
const Validacoes = require('../strategy/Validacoes');

class UserController {
    async handlePost(request, response) {
        const userService = new UserService();
        const user = new User(
            request.body.nome,
            request.body.nascimento,
            request.body.genero,
            request.body.cpf,
            request.body.telefones,
            request.body.senha,
            request.body.email,
            request.body.enderecos,
            request.body.cartoes,
        );
        const valida = new Validacoes();
        const result = await valida.validarEntradaUsuario(user);

        return response.json(result);
    }

    async handleListar(request, response) {
        const userService = new UserService();
        const result = await userService.buscarUsuarios();

        return response.json(result);
    }

    async handleInativaUser(request, response) {
        const userService = new UserService();
        const result = await userService.inativarUsuario(request.body.id);

        return response.json(result);
    }

    async handleAtivaUser(request, response) {
        const userService = new UserService();
        const result = await userService.ativarUsuario(request.body.id);

        return response.json(result);
    }

    async handleAlteraSenhaUser(request, response) {
        const valida = new Validacoes();
        const result = await valida.validarTrocaDeSenha(request.body.id, request.body.senha);

        return response.json(result);
    }

    async handleAlteraCliente(request, response){
        const userService = new UserService();
        const result = await userService.alterarCliente(request.body);
        return response.json(result);
    }

    async handleFiltrar(request, response){
        const userService = new UserService();
        const { cpf, email, nome } = request.body;
        const result = await userService.buscarUsuariosPorFiltro(cpf, email, nome);

        return response.json(result);
    }

    async handleAlteraCartao(request, response){
        const userService = new UserService();
        const result = await userService.alterarCartao(request.body);
        return response.json(result);
    }

    async handleAlterarEndereco(request, response){
        const userService = new UserService();
        const result = await userService.alterarEndereco(request.body);
        return response.json(result);
    }

    async handleAdicionarEndereco(request, response){
        const userService = new UserService();
        const result = await userService.adicionarEndereco(request.body);
        return response.json(result);
    }

    async handleAdicionarCartao(request, response){
        const userService = new UserService();
        const result = await userService.adicionarCartao(request.body);
        return response.json(result);
    }

    async handleDeletarEndereco(request, response){
        const userService = new UserService();
        const result = await userService.deletarEndereco(request.body);
        return response.json(result);
    }

    async handleDeletarCartao(request, response){
        const userService = new UserService();
        const result = await userService.deletarCartao(request.body);
        return response.json(result);
    }

    async handleBuscarUsuario(request, response){
        const userService = new UserService();
        const result = await userService.buscarUsuario(request.body.id);
        return response.json(result);
    }

    async handleLogin(request, response){
        const userService = new UserService();
        const valida = new Validacoes();
        let senha = '';
        senha = await valida.criptografaSenha(request.body.senha);
        const result = await userService.login(request.body.email, senha);
        return response.json(result);
    }
}

module.exports = { UserController };