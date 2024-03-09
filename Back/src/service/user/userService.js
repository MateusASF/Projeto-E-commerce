// UserService.js
const db = require('../../database/configBd');

class UserService {
    async criarUser(user) {
        await db.initialize();
        const connection = db.getConnection();

        console.log(user);

        await connection.execute(
            `INSERT INTO usuarios (ativo, nome, data_nascimento, genero, cpf, senha, email) VALUES (:ativo, :nome, :data_nascimento, :genero, :cpf, :senha, :email)`,
            {
                ativo: 1,
                nome: user.nome,
                data_nascimento: user.nascimento,
                genero: user.genero,
                cpf: user.cpf,
                senha: user.senha,
                email: user.email,
            },{autoCommit: true}
        );

        const result = await connection.execute(
            `SELECT id_usuario FROM usuarios WHERE cpf = :cpf`, {
                cpf: user.cpf
            }
        );

        const idUser = result.rows[0][0];

        user.cartoes.forEach(item => {
            connection.execute(
                `INSERT INTO cartoes (id_usuario, numero_cartao, nome_cliente, bandeira, cvv) VALUES (:id_usuario, :numero_cartao, :nome_cliente, :bandeira, :cvv)`, {
                    id_usuario: idUser,
                    numero_cartao: item.numeroCartao,
                    nome_cliente: item.nomeCliente,
                    bandeira: item.bandeira,
                    cvv: item.cvv
                },{autoCommit: true}
            );
        });

        user.telefones.forEach(item => {
            connection.execute(
                `INSERT INTO telefones (id_usuario, numero_telefone, tipo_telefone) values (:id_usuario, :numero_telefone, :tipo_telefone)`, {
                    id_usuario: idUser,
                    numero_telefone: item.numeroTelefone,
                    tipo_telefone: item.tipoTelefone
                }
            )
        })

        user.enderecos.forEach(item => {
            connection.execute(
                `INSERT INTO enderecos (id_usuario, logradouro, tipo_logradouro, numero, bairro, cidade, estado, pais, cep, tipo_residencia, observacoes) VALUES (:id_usuario, :logradouro, :tipo_logradouro, :numero, :bairro, :cidade, :estado, :pais, :cep, :tipo_residencia, :observacoes)`,{
                    id_usuario: idUser,
                    logradouro: item.logradouro,
                    tipo_logradouro: item.tipoLogradouro,
                    numero: item.numero,
                    bairro: item.bairro,
                    cidade: item.cidade,
                    estado: item.estado,
                    pais: item.pais,
                    cep: item.cep,
                    tipo_residencia: item.tipoResidencia,
                    observacoes: item.observacoes
                }
            )
        })

        //await connection.close();
        return "cadastrou";
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

    async inativarUsuario(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE usuarios SET ativo = 0 WHERE id_usuario = :id`,{id: id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async ativarUsuario(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE usuarios SET ativo = 1 WHERE id_usuario = :id`,{id: id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = UserService;