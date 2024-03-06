// UserService.js
const db = require('../../database/configBd');

class UserService {
    async criarUser(user) {
        await db.initialize();
        const connection = db.getConnection();

        const result = await connection.execute(
            `INSERT INTO usuario (nome, nascimento, genero, cpf, telefone, tipotelefone, senha, email, logradouro, tipoLogradouro, numero, bairro, cidade, estado, pais, cep, tipoResidencia, observacoes) VALUES (:nome, :nascimento, :genero, :cpf, :telefone, :tipotelefone, :senha, :email, :logradouro, :tipoLogradouro, :numero, :bairro, :cidade, :estado, :pais, :cep, :tipoResidencia, :observacoes)`,
            {
                nome: user.nome,
                nascimento: user.nascimento,
                genero: user.genero,
                cpf: user.cpf,
                telefone: user.telefone,
                tipotelefone: user.tipotelefone,
                senha: user.senha,
                email: user.email,
                logradouro: user.logradouro,
                tipoLogradouro: user.tipoLogradouro,
                numero: user.numero,
                bairro: user.bairro,
                cidade: user.cidade,
                estado: user.estado,
                pais: user.pais,
                cep: user.cep,
                tipoResidencia: user.tipoResidencia,
                observacoes: user.observacoes,
            },{autoCommit: true}
        );
        //await connection.close();
        return result;
    }

    async buscarUsuarios() {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const result = await connection.execute('SELECT * FROM usuario');
    
            const usuarios = result.rows.map(row => ({
                id: row[0],
                nome: row[1],
                dataNascimento: row[2],
                genero: row[3],
                cpf: row[4],
                rg: row[5],
                telefone: row[6],
                senha: row[7],
                email: row[8],
                logradouro: row[9],
                tipoLogradouro: row[10],
                numero: row[11],
                bairro: row[12],
                cidade: row[13],
                estado: row[14],
                pais: row[15],
                cep: row[16],
                tipoResidencia: row[17],
                observacoes: row[18]
            }));
    
            return usuarios;
        } catch (error) {
            console.error(error);
            //throw error;
        }
    }

    async deletarUsuario(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            console.log("id: " + id);
            const result = await connection.execute(`DELETE FROM USUARIO WHERE USUARIO.id = :id`,{id: id},{autoCommit: true});
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = UserService;