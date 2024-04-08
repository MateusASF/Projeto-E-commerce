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
        const valueId = result.rows[0][0];
        const idUser = valueId;

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

    async buscarUsuariosPorFiltro(filtros) {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            let usuarioIds = new Set();
            let filtrarUsuariosDiretamente = false;
    
            // Verificar filtros de telefones e coletar IDs de usuários
            if (filtros.telefones && filtros.telefones.length > 0) {
                for (const telefone of filtros.telefones) {
                    
                    const telefonesResult = await connection.execute('SELECT id_usuario FROM telefones WHERE numero_telefone = :numeroTelefone OR tipo_telefone = :tipoTelefone', {
                        numeroTelefone: telefone.numeroTelefone,
                        tipoTelefone: telefone.tipoTelefone
                    });

                    telefonesResult.rows.forEach(row => usuarioIds.add(row[0]));
                }
            }
    
            // Verificar filtros de enderecos e coletar IDs de usuários
            if (filtros.enderecos && filtros.enderecos.length > 0) {
                for (const endereco of filtros.enderecos) {
                    const enderecosResult = await connection.execute('SELECT id_usuario FROM enderecos WHERE logradouro = :logradouro OR numero = :numero OR tipo_logradouro = :tipoLogradouro OR bairro = :bairro OR cidade = :cidade OR estado = :estado OR pais = :pais OR cep = :cep OR tipo_residencia = :tipoResidencia OR observacoes = :observacoes OR identificacao = :identificacao OR tipo_endereco = :tipoEndereco', {
                        logradouro: endereco.logradouro,
                        numero: endereco.numero,
                        tipoLogradouro: endereco.tipoLogradouro,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        estado: endereco.estado,
                        pais: endereco.pais,
                        cep: endereco.cep,
                        tipoResidencia: endereco.tipoResidencia,
                        observacoes: endereco.observacoes,
                        identificacao: endereco.identificacao,
                        tipoEndereco: endereco.tipoEndereco
                    });
                    enderecosResult.rows.forEach(row => usuarioIds.add(row[0]));
                }
            }
    
            // Verificar filtros de cartoes e coletar IDs de usuários
            if (filtros.cartoes && filtros.cartoes.length > 0) {
                for (const cartao of filtros.cartoes) {
                    const cartoesResult = await connection.execute('SELECT id_usuario FROM cartoes WHERE numero_Cartao = :numeroCartao OR cvv = :cvv OR bandeira = :bandeira OR nome_cliente = :nomeCliente', {
                        numeroCartao: cartao.numeroCartao,
                        cvv: cartao.cvv,
                        bandeira: cartao.bandeira,
                        nomeCliente: cartao.nomeCliente
                    });
                    cartoesResult.rows.forEach(row => usuarioIds.add(row[0]));
                }
            }
    
            // Verificar filtros diretos de usuários
            const camposUsuarios = ['cpf', 'email', 'nome', 'nascimento', 'genero'];
            const whereClausesUsuarios = camposUsuarios.filter(campo => filtros[campo]).map(campo => `${campo} = :${campo}`);
            const sqlParamsUsuarios = camposUsuarios.reduce((params, campo) => {
                if (filtros[campo]) params[campo] = filtros[campo];
                return params;
            }, {});
    
            if (whereClausesUsuarios.length > 0) {
                filtrarUsuariosDiretamente = true;
                const whereClauseUsuarios = `WHERE ${whereClausesUsuarios.join(' AND ')}`;
                const usuariosDiretosResult = await connection.execute(`SELECT id_usuario FROM usuarios ${whereClauseUsuarios}`, sqlParamsUsuarios);
                usuariosDiretosResult.rows.forEach(row => usuarioIds.add(row[0]));
            }
    
            // Se nenhum filtro resultou em IDs de usuário, e não estamos filtrando diretamente os usuários, retornar lista vazia
            if (usuarioIds.size === 0 && !filtrarUsuariosDiretamente) return [];
    
            // Consulta final para buscar informações dos usuários baseada nos IDs coletados ou filtros diretos
            let queryFinal = 'SELECT * FROM usuarios';
            let paramsFinal = {};
            if (usuarioIds.size > 0) { 
                queryFinal += ` WHERE id_usuario IN (${Array.from(usuarioIds).map((id, index) => `:id${index}`).join(', ')})`;
                paramsFinal = Array.from(usuarioIds).reduce((params, id, index) => {
                    params[`id${index}`] = id;
                    return params;
                }, {});
            } else if (filtrarUsuariosDiretamente) {
                queryFinal += ` WHERE ${whereClausesUsuarios.join(' AND ')}`;
                paramsFinal = sqlParamsUsuarios;
            }
    
            const usuariosResult = await connection.execute(queryFinal, paramsFinal);
            const usuarios = await Promise.all(usuariosResult.rows.map(async usuarioRow => {
                const idUsuario = usuarioRow[0];
    
                // Busca de telefones associados ao usuário
                const telefonesResult = await connection.execute('SELECT * FROM telefones WHERE id_usuario = :id', { id: idUsuario });
                const telefones = telefonesResult.rows.map(telefoneRow => ({
                    idTelefone: telefoneRow[0],
                    numeroTelefone: telefoneRow[2],
                    tipoTelefone: telefoneRow[3]
                }));
    
                // Busca de enderecos associados ao usuário
                const enderecosResult = await connection.execute('SELECT * FROM enderecos WHERE id_usuario = :id', { id: idUsuario });
                const enderecos = enderecosResult.rows.map(enderecoRow => ({
                    logradouro: enderecoRow[1],
                    tipoLogradouro: enderecoRow[2],
                    numero: enderecoRow[3],
                    bairro: enderecoRow[4],
                    cidade: enderecoRow[5],
                    estado: enderecoRow[6],
                    pais: enderecoRow[7],
                    cep: enderecoRow[8],
                    tipoResidencia: enderecoRow[9],
                    observacoes: enderecoRow[10],
                    identificacao: enderecoRow[11],
                    tipoEndereco: enderecoRow[12]
                }));
    
                // Busca de cartoes associados ao usuário
                const cartoesResult = await connection.execute('SELECT * FROM cartoes WHERE id_usuario = :id', { id: idUsuario });
                const cartoes = cartoesResult.rows.map(cartaoRow => ({
                    numeroCartao: cartaoRow[1],
                    nomeCliente: cartaoRow[2],
                    bandeira: cartaoRow[3],
                    cvv: cartaoRow[4]
                }));
    
                return {
                    id: usuarioRow[0],
                    ativo: usuarioRow[1],
                    nome: usuarioRow[2],
                    nascimento: usuarioRow[3],
                    genero: usuarioRow[4],
                    cpf: usuarioRow[5],
                    senha: usuarioRow[6],
                    email: usuarioRow[7],
                    telefones,
                    enderecos,
                    cartoes
                };
            }));
    
            return usuarios;
    
        } catch (error) {
            console.error('Erro ao buscar usuários por filtro:', error);
            throw error;
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