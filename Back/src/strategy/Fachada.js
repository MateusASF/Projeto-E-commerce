const UserService = require("../service/user/userService")
var userService = new UserService();

class Fachada {

    async validaSenhaForte (senhaUser) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!regex.test(senhaUser)) {
            throw new Error('A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, letras minúsculas e números.');
        }
        return true;
    }

    async criptografaSenha (senhaUser) {
        const senhaCriptografada = Buffer.from(senhaUser).toString('base64');
        return senhaCriptografada;
    }

    async validarEntradaUsuario (user) {
        var ok = false;
        ok = await this.validaSenhaForte(user.senha);
        user.senha = await this.criptografaSenha(user.senha);
        return ok ? await userService.criarUser(user) : "Erro ao validar entradas";
    }

    async validarTrocaDeSenha (id, senha) {
        var ok = false;
        ok = await this.validaSenhaForte(senha);
        senha = await this.criptografaSenha(senha);
        return ok ? await userService.alteraSenhaUser(id, senha) : "Erro ao trocar de senha";
    }
}

module.exports = Fachada;