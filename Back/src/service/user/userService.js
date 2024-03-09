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
                },{autoCommit: true}
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
                },{autoCommit: true}
            )
        })

        //await connection.close();
        return "cadastrou";
    }

    async buscarUsuarios() {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const result = await connection.execute('SELECT * FROM usuarios');
    
            const usuarios = await Promise.all(result.rows.map(async row => {
                const id = row[0];
    
                const telefonesResult = await connection.execute('SELECT * FROM telefones WHERE id_usuario = :id', { id });
                const telefones = telefonesResult.rows.map(row => ({
                    numeroTelefone: row[2],
                    tipoTelefone: row[3]
                }));
    
                const enderecosResult = await connection.execute('SELECT * FROM enderecos WHERE id_usuario = :id', { id });
                const enderecos = enderecosResult.rows.map(row => ({
                    logradouro: row[2],
                    tipoLogradouro: row[3],
                    numero: row[4],
                    bairro: row[5],
                    cidade: row[6],
                    estado: row[7],
                    pais: row[8],
                    cep: row[9],
                    tipoResidencia: row[10],
                    observacoes: row[11]
                }));
    
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id });
                const cartoes = cartoesResult.rows.map(row => ({
                    numeroCartao: row[2],
                    nomeCliente: row[3],
                    bandeira: row[4],
                    cvv: row[5]
                }));
    
                return {
                    nome: row[2],
                    nascimento: row[3],
                    genero: row[4],
                    cpf: row[5],
                    telefones,
                    senha: row[6],
                    email: row[7],
                    enderecos,
                    cartoes
                };
            }));
    
            return usuarios;
        } catch (error) {
            console.error(error);
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

    async alteraSenhaUser(id, senha) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE usuarios SET senha = :senha WHERE id_usuario = :id`,{senha: senha, id: id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = UserService;