const User = require('../models/User');
const UserService = require('../service/user/userService');

class UserController {
    async handlePost(request, response) {
        const userService = new UserService();
        const user = new User(
            request.body.nome,
            request.body.nascimento,
            request.body.generoForm.genero,
            request.body.cpf,
            request.body.telefone,
            request.body.tipoTelefoneForm.tipotelefone,
            request.body.senha,
            request.body.email,
            request.body.logradouro,
            request.body.logradouroForm.tipoLogradouro,
            request.body.numero,
            request.body.bairro,
            request.body.cidade,
            request.body.estado,
            request.body.pais,
            request.body.cep,
            request.body.residenciaForm.tipoResidencia,
            request.body.observacoes
        );

        console.log(user);
        const result = await userService.criarUser(user);

        return response.json(result);
    }

    async handleListar(request, response) {
        const userService = new UserService();
        const result = await userService.buscarUsuarios();

        return response.json(result);
    }

    async handleDelete(request, response) {
        const userService = new UserService();
        console.log(request.body.id);
        const result = await userService.deletarUsuario(request.body.id);

        return response.json(result);
    }
}

module.exports = { UserController };