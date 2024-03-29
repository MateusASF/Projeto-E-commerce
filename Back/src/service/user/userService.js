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
                `INSERT INTO enderecos (id_usuario, logradouro, tipo_logradouro, numero, bairro, cidade, estado, pais, cep, tipo_residencia, observacoes, identificacao, tipo_endereco) VALUES (:id_usuario, :logradouro, :tipo_logradouro, :numero, :bairro, :cidade, :estado, :pais, :cep, :tipo_residencia, :observacoes, :identificacao, :tipo_endereco)`,{
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
                    observacoes: item.observacoes,
                    identificacao: item.identificacao,
                    tipo_endereco: item.tipoEndereco
                },{autoCommit: true}
            )
        })

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
                    idTelefone: row[0],
                    numeroTelefone: row[2],
                    tipoTelefone: row[3]
                }));
    
                const enderecosResult = await connection.execute('SELECT * FROM enderecos WHERE id_usuario = :id', { id });
                const enderecos = enderecosResult.rows.map(row => ({
                    idEndereco: row[0],
                    logradouro: row[2],
                    tipoLogradouro: row[3],
                    numero: row[4],
                    bairro: row[5],
                    cidade: row[6],
                    estado: row[7],
                    pais: row[8],
                    cep: row[9],
                    tipoResidencia: row[10],
                    observacoes: row[11],
                    identificacao: row[12],
                    tipoEndereco: row[13]
                }));
    
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id });
                const cartoes = cartoesResult.rows.map(row => ({
                    idCartao: row[0],
                    numeroCartao: row[2],
                    nomeCliente: row[3],
                    bandeira: row[4],
                    cvv: row[5]
                }));
    
                return {
                    id : row[0],
                    ativo: row[1],
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

    async buscarUsuariosPorFiltro(cpf, email, nome) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`SELECT * FROM usuarios WHERE cpf = :cpf OR email = :email OR nome = :nome`,{cpf, email, nome});
            const usuarios = await Promise.all(result.rows.map(async row => {
                const id = row[0];
    
                const telefonesResult = await connection.execute('SELECT * FROM telefones WHERE id_usuario = :id', { id });
                const telefones = telefonesResult.rows.map(row => ({
                    idTelefone: row[0],
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
                    observacoes: row[11],
                    identificacao: row[12],
                    tipoEndereco: row[13]
                }));
    
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id });
                const cartoes = cartoesResult.rows.map(row => ({
                    numeroCartao: row[2],
                    nomeCliente: row[3],
                    bandeira: row[4],
                    cvv: row[5]
                }));
    
                return {
                    id : row[0],
                    ativo: row[1],
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

    async alterarCartao(data) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE cartoes SET numero_cartao = :numero_cartao, nome_cliente = :nome_cliente, bandeira = :bandeira, cvv = :cvv WHERE id_usuario = :id_usuario AND id_cartao = :id_cartao`,
            {numero_cartao: data.numeroCartao, nome_cliente: data.nomeCliente, bandeira: data.bandeira, cvv: data.cvv, id_usuario: data.idCliente, id_cartao: data.idCartao},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async alterarEndereco(data) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE enderecos SET logradouro = :logradouro, tipo_logradouro = :tipo_logradouro, numero = :numero, bairro = :bairro, cidade = :cidade, estado = :estado, pais = :pais, cep = :cep, tipo_residencia = :tipo_residencia, observacoes = :observacoes, tipo_endereco = :tipo_endereco, identificacao = :identificacao WHERE id_usuario = :id_usuario AND id_endereco = :id_endereco`,
            {logradouro: data.logradouro, tipo_logradouro: data.tipoLogradouro, numero: data.numero, bairro: data.bairro, cidade: data.cidade, estado: data.estado, pais: data.pais, cep: data.cep, tipo_residencia: data.tipoResidencia, observacoes: data.observacao, identificacao: data.identificacao, tipo_endereco: data.tipoEndereco, id_usuario: data.idCliente, id_endereco: data.idEndereco},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async adicionarEndereco(data) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`INSERT INTO enderecos (id_usuario, logradouro, tipo_logradouro, numero, bairro, cidade, estado, pais, cep, tipo_residencia, observacoes) VALUES (:id_usuario, :logradouro, :tipo_logradouro, :numero, :bairro, :cidade, :estado, :pais, :cep, :tipo_residencia, :observacoes, identificacao = :identificacao, tipo_endereco = :tipo_endereco)`,
            {id_usuario: data.idCliente, logradouro: data.logradouro, tipo_logradouro: data.tipoLogradouro, numero: data.numero, bairro: data.bairro, cidade: data.cidade, estado: data.estado, pais: data.pais, cep: data.cep, tipo_residencia: data.tipoResidencia, observacoes: data.observacao, identificacao: data.identificacao, tipo_endereco: data.tipoEndereco},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async adicionarCartao(data) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`INSERT INTO cartoes (id_usuario, numero_cartao, nome_cliente, bandeira, cvv) VALUES (:id_usuario, :numero_cartao, :nome_cliente, :bandeira, :cvv)`,
            {id_usuario: data.idCliente, numero_cartao: data.numeroCartao, nome_cliente: data.nomeCliente, bandeira: data.bandeira, cvv: data.cvv},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async deletarEndereco(idEndereco) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`DELETE FROM enderecos WHERE id_endereco = :id_endereco`,{id_endereco: idEndereco.id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async deletarCartao(idCartao) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`DELETE FROM cartoes WHERE id_cartao = :id_cartao`,{id_cartao: idCartao.id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async buscarUsuario(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`SELECT * FROM usuarios WHERE id_usuario = :id`,{id});
            const usuarios = await Promise.all(result.rows.map(async row => {
                const id = row[0];
    
                const telefonesResult = await connection.execute('SELECT * FROM telefones WHERE id_usuario = :id', { id });
                const telefones = telefonesResult.rows.map(row => ({
                    idTelefone: row[0],
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
                    observacoes: row[11],
                    identificacao: row[12],
                    tipoEndereco: row[13]
                }));
    
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id });
                const cartoes = cartoesResult.rows.map(row => ({
                    numeroCartao: row[2],
                    nomeCliente: row[3],
                    bandeira: row[4],
                    cvv: row[5]
                }));
    
                return {
                    id : row[0],
                    ativo: row[1],
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

    async alterarCliente(data) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            let result = await connection.execute(`UPDATE usuarios SET nome = :nome, data_nascimento = :data_nascimento, genero = :genero, cpf = :cpf, email = :email WHERE id_usuario = :id_usuario`,
            {nome: data.nome, data_nascimento: data.nascimento, genero: data.genero, cpf: data.cpf,  email: data.email, id_usuario: data.idCliente},{autoCommit: true});
            result = await connection.execute('UPDATE telefones SET numero_telefone = :numero_telefone, tipo_telefone = :tipo_telefone WHERE id_usuario = :id_usuario AND id_telefone = :id_telefone',
            {numero_telefone: data.numeroTelefone, tipo_telefone: data.tipoTelefone, id_usuario: data.idCliente, id_telefone: data.idTelefone },{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async login (email, senha) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`SELECT * FROM usuarios WHERE email = :email AND senha = :senha`,{email, senha});
            const usuario = await Promise.all(result.rows.map(async row => {
                const id = row[0];
    
                const telefonesResult = await connection.execute('SELECT * FROM telefones WHERE id_usuario = :id', { id });
                const telefones = telefonesResult.rows.map(row => ({
                    idTelefone: row[0],
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
                    observacoes: row[11],
                    identificacao: row[12],
                    tipoEndereco: row[13]
                }));
    
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id });
                const cartoes = cartoesResult.rows.map(row => ({
                    numeroCartao: row[2],
                    nomeCliente: row[3],
                    bandeira: row[4],
                    cvv: row[5]
                }));
    
                return {
                    id : row[0],
                    ativo: row[1],
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
            return usuario;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = UserService;