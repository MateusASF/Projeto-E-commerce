// CompraService.js
const db = require('../../database/configBd');

class CompraService {
    async inserirCompra(compra) {
        try {
            await db.initialize();
            const connection = db.getConnection(); 
    
            // Inserir dados na tabela de compras
            const compraQuery = `INSERT INTO Compra (id_compra, codCompra, id_usuario, enderecoEntrega, total, frete, cupom, status) VALUES (compra_seq.nextval, :codCompra, :id_usuario, :enderecoEntrega, :total, :frete, :cupom, :status)`;
            const compraParams = {
                codCompra: compra.codCompra,
                id_usuario: compra.cliente,
                enderecoEntrega: compra.enderecoEntrega,
                total: compra.total,
                frete: compra.frete,
                cupom: compra.cupom,
                status: compra.status
            };
            await connection.execute(compraQuery, compraParams);

            let compraId = await connection.execute('SELECT id_compra FROM compra WHERE codCompra = :codCompra', { codCompra: compra.codCompra});
            compraId = compraId.rows[0][0];

            // Inserir itens de compra
            for (const item of compra.carrinho) {
                const itemQuery = `INSERT INTO ItensCompra (id_compra, id_produto, quantidade) VALUES (:id_compra, :id_produto, :quantidade)`;
                const itemParams = {
                    id_compra: compraId,
                    id_produto: item.produto,
                    quantidade: item.quantidade
                };
                await connection.execute(itemQuery, itemParams);
            }

    
            // Inserir cartões de crédito
            for (const cartao of compra.cartoes) {
                let idCartao = await connection.execute('SELECT id_cartao FROM Cartoes WHERE numero_cartao = :numero_cartao AND id_usuario = :id_usuario', { numero_cartao: compra.cartoes[0].numeroCartao, id_usuario: compra.cliente });
                idCartao = idCartao.rows[0][0];
                const cartaoQuery = `INSERT INTO CartoesCompra (id_compra, id_cartao, valor) VALUES (:id_compra, :id_cartao, :valor)`;
                const cartaoParams = {
                    id_compra: compraId,
                    id_cartao: idCartao,
                    valor: cartao.valor
                };
                await connection.execute(cartaoQuery, cartaoParams);
            }
    
            // Commit da transação
            await connection.commit();
            
            console.log('Compra inserida com sucesso.');
    
            // Fechar conexão com o banco de dados
            await connection.close();
        } catch (error) {
            console.error('Erro ao inserir compra:', error.message);
    
            // Rollback em caso de erro
            await connection.rollback();
    
            // Fechar conexão com o banco de dados
            await connection.close();
        }
    }

    async listarCompras() {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const query = `SELECT 
            c.id_compra AS "id",
            c.codCompra AS "codCompra",
            JSON_OBJECT(
                'id' VALUE u.id_usuario,
                'ativo' VALUE u.ativo,
                'nome' VALUE u.nome,
                'nascimento' VALUE TO_CHAR(u.data_nascimento, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"'),
                'genero' VALUE u.genero,
                'cpf' VALUE u.cpf,
                'telefones' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idTelefone' VALUE t.id_telefone,
                            'numeroTelefone' VALUE t.numero_telefone,
                            'tipoTelefone' VALUE t.tipo_telefone
                        )
                    )
                    FROM telefones t
                    WHERE t.id_usuario = u.id_usuario
                ),
                'senha' VALUE u.senha,
                'email' VALUE u.email,
                'enderecosEntrega' VALUE (
                    SELECT JSON_OBJECT(
                        'id' VALUE e.id_endereco,
                        'logradouro' VALUE e.logradouro,
                        'tipoLogradouro' VALUE e.tipo_logradouro,
                        'numero' VALUE e.numero,
                        'bairro' VALUE e.bairro,
                        'cidade' VALUE e.cidade,
                        'estado' VALUE e.estado,
                        'pais' VALUE e.pais,
                        'cep' VALUE e.cep,
                        'tipoResidencia' VALUE e.tipo_residencia,
                        'observacoes' VALUE e.observacoes,
                        'identificacao' VALUE e.identificacao,
                        'tipoEndereco' VALUE e.tipo_endereco
                    )
                    FROM enderecos e
                    WHERE e.id_usuario = u.id_usuario AND e.tipo_endereco = 'Entrega'
                    FETCH FIRST 1 ROW ONLY
                ),
                'cartoesUsados' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'numeroCartao' VALUE ca.numero_cartao,
                            'nomeCliente' VALUE ca.nome_cliente,
                            'bandeira' VALUE ca.bandeira,
                            'cvv' VALUE ca.cvv,
                            'valor' VALUE cc.valor
                        )
                    )
                    FROM cartoes ca
                    JOIN CartoesCompra cc ON ca.id_cartao = cc.id_cartao
                    WHERE cc.id_compra = c.id_compra
                )
            ) AS "cliente",
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id' VALUE p.id,
                    'nome' VALUE p.nome,
                    'marca' VALUE p.marca,
                    'ano' VALUE p.ano,
                    'modelo' VALUE p.modelo,
                    'codRelogio' VALUE p.codRelogio,
                    'genero' VALUE p.genero,
                    'tamanho' VALUE p.tamanho,
                    'faixaPreco' VALUE p.faixaPreco,
                    'preco' VALUE p.preco,
                    'descricao' VALUE p.descricao,
                    'quantidade' VALUE ic.quantidade,
                    'Categorias' VALUE (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id' VALUE cat.id,
                                'nome' VALUE cat.nome
                            )
                        )
                        FROM Categoria cat
                        JOIN Produto_Categoria pc ON cat.id = pc.categoria_id
                        WHERE pc.produto_id = p.id
                    )
                )
            ) AS "itens",
            c.total AS "total",
            c.frete AS "frete",
            c.cupom AS "cupom",
            c.status AS "status",
            TO_CHAR(c.dataCompra, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"') AS "data"
        FROM Compra c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        JOIN ItensCompra ic ON c.id_compra = ic.id_compra
        JOIN Produto p ON ic.id_produto = p.id
        GROUP BY c.id_compra, c.codCompra, u.id_usuario, u.ativo, u.nome, u.data_nascimento, u.genero, u.cpf, u.senha, u.email, c.total, c.frete, c.cupom, c.status, c.dataCompra`;
            const result = await connection.execute(query);
    
            // Fechar conexão com o banco de dados
            await connection.close();
            const compras = result.rows.map(row => {
                return {
                    id: row[0],
                    codCompra: row[1],
                    cliente: JSON.parse(row[2]),
                    itens: JSON.parse(row[3]),
                    total: row[4],
                    frete: row[5],
                    cupom: row[6],
                    status: row[7],
                    data: row[8]
                
                };   
            });
            return compras;
        } catch (error) {
            console.error('Erro ao listar compras:', error.message);
        }
    }
    
    async listarComprasPorId(id_usuario) {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const query = `SELECT 
            c.id_compra AS "id",
            c.codCompra AS "codCompra",
            JSON_OBJECT(
                'id' VALUE u.id_usuario,
                'ativo' VALUE u.ativo,
                'nome' VALUE u.nome,
                'nascimento' VALUE TO_CHAR(u.data_nascimento, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"'),
                'genero' VALUE u.genero,
                'cpf' VALUE u.cpf,
                'telefones' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idTelefone' VALUE t.id_telefone,
                            'numeroTelefone' VALUE t.numero_telefone,
                            'tipoTelefone' VALUE t.tipo_telefone
                        )
                    )
                    FROM telefones t
                    WHERE t.id_usuario = u.id_usuario
                ),
                'senha' VALUE u.senha,
                'email' VALUE u.email,
                'enderecosEntrega' VALUE (
                    SELECT JSON_OBJECT(
                        'id' VALUE e.id_endereco,
                        'logradouro' VALUE e.logradouro,
                        'tipoLogradouro' VALUE e.tipo_logradouro,
                        'numero' VALUE e.numero,
                        'bairro' VALUE e.bairro,
                        'cidade' VALUE e.cidade,
                        'estado' VALUE e.estado,
                        'pais' VALUE e.pais,
                        'cep' VALUE e.cep,
                        'tipoResidencia' VALUE e.tipo_residencia,
                        'observacoes' VALUE e.observacoes,
                        'identificacao' VALUE e.identificacao,
                        'tipoEndereco' VALUE e.tipo_endereco
                    )
                    FROM enderecos e
                    WHERE e.id_usuario = u.id_usuario AND e.tipo_endereco = 'Entrega'
                    FETCH FIRST 1 ROW ONLY
                ),
                'cartoesUsados' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'numeroCartao' VALUE ca.numero_cartao,
                            'nomeCliente' VALUE ca.nome_cliente,
                            'bandeira' VALUE ca.bandeira,
                            'cvv' VALUE ca.cvv,
                            'valor' VALUE cc.valor
                        )
                    )
                    FROM cartoes ca
                    JOIN CartoesCompra cc ON ca.id_cartao = cc.id_cartao
                    WHERE cc.id_compra = c.id_compra
                )
            ) AS "cliente",
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id' VALUE p.id,
                    'nome' VALUE p.nome,
                    'marca' VALUE p.marca,
                    'ano' VALUE p.ano,
                    'modelo' VALUE p.modelo,
                    'codRelogio' VALUE p.codRelogio,
                    'genero' VALUE p.genero,
                    'tamanho' VALUE p.tamanho,
                    'faixaPreco' VALUE p.faixaPreco,
                    'preco' VALUE p.preco,
                    'descricao' VALUE p.descricao,
                    'quantidade' VALUE ic.quantidade,
                    'Categorias' VALUE (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id' VALUE cat.id,
                                'nome' VALUE cat.nome
                            )
                        )
                        FROM Categoria cat
                        JOIN Produto_Categoria pc ON cat.id = pc.categoria_id
                        WHERE pc.produto_id = p.id
                    )
                )
            ) AS "itens",
            c.total AS "total",
            c.frete AS "frete",
            c.cupom AS "cupom",
            c.status AS "status",
            TO_CHAR(c.dataCompra, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"') AS "data"
        FROM Compra c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        JOIN ItensCompra ic ON c.id_compra = ic.id_compra
        JOIN Produto p ON ic.id_produto = p.id
        WHERE c.id_usuario = :id_usuario
        GROUP BY c.id_compra, c.codCompra, u.id_usuario, u.ativo, u.nome, u.data_nascimento, u.genero, u.cpf, u.senha, u.email, c.total, c.frete, c.cupom, c.status, c.dataCompra`;
            const result = await connection.execute(query, { id_usuario: id_usuario });
    
            // Fechar conexão com o banco de dados
            await connection.close();
            const compras = result.rows.map(row => {
                return {
                    id: row[0],
                    codCompra: row[1],
                    cliente: JSON.parse(row[2]),
                    itens: JSON.parse(row[3]),
                    total: row[4],
                    frete: row[5],
                    cupom: row[6],
                    status: row[7],
                    data: row[8]
                
                };   
            });
            return compras;
        } catch (error) {
            console.error('Erro ao listar compras:', error.message);
        }
    }

    async atualizarStatusVendaCompra(id_compra, status) {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const query = `UPDATE Compra SET status = :status WHERE id_compra = :id_compra`;
            await connection.execute(query, { status, id_compra });
    
            await connection.commit();
    
            console.log('Status da compra atualizado com sucesso.');
    
            await connection.close();
        } catch (error) {
            console.error('Erro ao atualizar status da compra:', error.message);
    
            await connection.rollback();
    
            await connection.close();
        }
    }

    async listarComprasPorCodCompra(codCompra) {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const query = `SELECT 
            c.id_compra AS "id",
            c.codCompra AS "codCompra",
            JSON_OBJECT(
                'id' VALUE u.id_usuario,
                'ativo' VALUE u.ativo,
                'nome' VALUE u.nome,
                'nascimento' VALUE TO_CHAR(u.data_nascimento, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"'),
                'genero' VALUE u.genero,
                'cpf' VALUE u.cpf,
                'telefones' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idTelefone' VALUE t.id_telefone,
                            'numeroTelefone' VALUE t.numero_telefone,
                            'tipoTelefone' VALUE t.tipo_telefone
                        )
                    )
                    FROM telefones t
                    WHERE t.id_usuario = u.id_usuario
                ),
                'senha' VALUE u.senha,
                'email' VALUE u.email,
                'enderecosEntrega' VALUE (
                    SELECT JSON_OBJECT(
                        'id' VALUE e.id_endereco,
                        'logradouro' VALUE e.logradouro,
                        'tipoLogradouro' VALUE e.tipo_logradouro,
                        'numero' VALUE e.numero,
                        'bairro' VALUE e.bairro,
                        'cidade' VALUE e.cidade,
                        'estado' VALUE e.estado,
                        'pais' VALUE e.pais,
                        'cep' VALUE e.cep,
                        'tipoResidencia' VALUE e.tipo_residencia,
                        'observacoes' VALUE e.observacoes,
                        'identificacao' VALUE e.identificacao,
                        'tipoEndereco' VALUE e.tipo_endereco
                    )
                    FROM enderecos e
                    WHERE e.id_usuario = u.id_usuario AND e.tipo_endereco = 'Entrega'
                    FETCH FIRST 1 ROW ONLY
                ),
                'cartoesUsados' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'numeroCartao' VALUE ca.numero_cartao,
                            'nomeCliente' VALUE ca.nome_cliente,
                            'bandeira' VALUE ca.bandeira,
                            'cvv' VALUE ca.cvv,
                            'valor' VALUE cc.valor
                        )
                    )
                    FROM cartoes ca
                    JOIN CartoesCompra cc ON ca.id_cartao = cc.id_cartao
                    WHERE cc.id_compra = c.id_compra
                )
            ) AS "cliente",
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id' VALUE p.id,
                    'nome' VALUE p.nome,
                    'marca' VALUE p.marca,
                    'ano' VALUE p.ano,
                    'modelo' VALUE p.modelo,
                    'codRelogio' VALUE p.codRelogio,
                    'genero' VALUE p.genero,
                    'tamanho' VALUE p.tamanho,
                    'faixaPreco' VALUE p.faixaPreco,
                    'preco' VALUE p.preco,
                    'descricao' VALUE p.descricao,
                    'quantidade' VALUE ic.quantidade,
                    'Categorias' VALUE (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id' VALUE cat.id,
                                'nome' VALUE cat.nome
                            )
                        )
                        FROM Categoria cat
                        JOIN Produto_Categoria pc ON cat.id = pc.categoria_id
                        WHERE pc.produto_id = p.id
                    )
                )
            ) AS "itens",
            c.total AS "total",
            c.frete AS "frete",
            c.cupom AS "cupom",
            c.status AS "status",
            TO_CHAR(c.dataCompra, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"') AS "data"
        FROM Compra c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        JOIN ItensCompra ic ON c.id_compra = ic.id_compra
        JOIN Produto p ON ic.id_produto = p.id
        WHERE c.codCompra = :codCompra
        GROUP BY c.id_compra, c.codCompra, u.id_usuario, u.ativo, u.nome, u.data_nascimento, u.genero, u.cpf, u.senha, u.email, c.total, c.frete, c.cupom, c.status, c.dataCompra`;
            const result = await connection.execute(query, { codCompra });
    
            await connection.close();
            const compras = result.rows.map(row => {
                return {
                    id: row[0],
                    codCompra: row[1],
                    cliente: JSON.parse(row[2]),
                    itens: JSON.parse(row[3]),
                    total: row[4],
                    frete: row[5],
                    cupom: row[6],
                    status: row[7],
                    data: row[8]
                
                };   
            });
            return compras;
        }
        catch (error) {
            console.error('Erro ao listar compras:', error.message);
        }
    }

    async inserirTroca(troca) {
        try {
            await db.initialize();
            const connection = db.getConnection();
    
            const query = `INSERT INTO Trocas (id_troca, id_usuario, codTroca, motivo, status, cupom) VALUES (troca_seq.nextval, :id_usuario, :codTroca, :motivo, :status, :cupom)`;
            const params = {
                id_usuario: troca.id_usuario,
                codTroca: troca.codTroca,
                motivo: troca.motivo,
                status: troca.status,
                cupom: troca.cupom
            };
            await connection.execute(query, params);

            let trocaId = await connection.execute('SELECT id_troca FROM Trocas WHERE codTroca = :codTroca', { codTroca: troca.codTroca});
            trocaId = trocaId.rows[0][0];

            troca.itens.forEach(async item => {
                const itemQuery = `INSERT INTO ItensTroca (id_troca, id_produto, quantidade) VALUES (:id_troca, :id_produto, :quantidade)`;
                const itemParams = {
                    id_troca: trocaId,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade
                };
                await connection.execute(itemQuery, itemParams);
            });

            await connection.execute('INSERT INTO Cupom (idCupom, codCupom, valor, porcentagem, status, tipo) VALUES (cupom_seq.nextval, :codCupom, :valor, :porcentagem, :status, :tipo)', { codCupom: troca.codCupom, valor: troca.valor, porcentagem: troca.porcentagem, status: troca.statusCupom, tipo: troca.tipo });
            

            await connection.commit();
    
            console.log('Troca inserida com sucesso.');
    
            await connection.close();
        } catch (error) {
            console.error('Erro ao inserir troca:', error.message);
    
            await connection.rollback();
    
            await connection.close();
        }
    }

    async listarTrocas() {
        try {
            await db.initialize();
            const connection = db.getConnection();

            const query = `SELECT t.id_troca AS "id", t.codTroca AS "codTroca", t.motivo AS "motivo", t.status AS "status",
            JSON_OBJECT(
                'id' VALUE u.id_usuario,
                'ativo' VALUE u.ativo,
                'nome' VALUE u.nome,
                'nascimento' VALUE TO_CHAR(u.data_nascimento, 'YYYY-MM-DD"T"HH24:MI:SS".000Z"'),
                'genero' VALUE u.genero,
                'cpf' VALUE u.cpf,
                'telefones' VALUE (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idTelefone' VALUE t.id_telefone,
                            'numeroTelefone' VALUE t.numero_telefone,
                            'tipoTelefone' VALUE t.tipo_telefone
                        )
                    )
                    FROM telefones t
                    WHERE t.id_usuario = u.id_usuario
                ),
                'senha' VALUE u.senha,
                'email' VALUE u.email
            ) AS "cliente",
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id' VALUE p.id,
                    'nome' VALUE p.nome,
                    'marca' VALUE p.marca,
                    'ano' VALUE p.ano,
                    'modelo' VALUE p.modelo,
                    'codRelogio' VALUE p.codRelogio,
                    'genero' VALUE p.genero,
                    'tamanho' VALUE p.tamanho,
                    'faixaPreco' VALUE p.faixaPreco,
                    'preco' VALUE p.preco,
                    'descricao' VALUE p.descricao,
                    'quantidade' VALUE it.quantidade,
                    'Categorias' VALUE (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id' VALUE cat.id,
                                'nome' VALUE cat.nome
                            )
                        )
                        FROM Categoria cat
                        JOIN Produto_Categoria pc ON cat.id = pc.categoria_id
                        WHERE pc.produto_id = p.id
                    )
                )
            ) AS "itens",
            c.valor AS "valor",
            c.porcentagem AS "porcentagem",
            c.status AS "statusCupom",
            c.tipo AS "tipo"
        FROM Trocas t
        JOIN usuarios u ON t.id_usuario = u.id_usuario
        JOIN ItensTroca it ON t.id_troca = it.id_troca
        JOIN Produto p ON it.id_produto = p.id
        JOIN Cupom c ON t.cupom = c.codCupom
        GROUP BY t.id_troca, t.codTroca, t.motivo, t.status, u.id_usuario, u.ativo, u.nome, u.data_nascimento, u.genero, u.cpf, u.senha, u.email, c.valor, c.porcentagem, c.status, c.tipo`;
            const result = await connection.execute(query);
    
            await connection.close();
            const trocas = result.rows.map(row => {
                return {
                    id: row[0],
                    codTroca: row[1],
                    motivo: row[2],
                    status: row[3],
                    cliente: JSON.parse(row[4]),
                    itens: JSON.parse(row[5]),
                    valor: row[6],
                    cupom: {
                        porcentagem: row[7],
                        statusCupom: row[8],
                        tipo: row[9],
                        valor: row[6]
                    },
                };
            });
            return trocas;

        } catch (error) {
            console.error('Erro ao listar trocas:', error.message);
        }
    }
}


module.exports = CompraService;