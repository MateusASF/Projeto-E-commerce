// ProdutoService.js
const db = require('../../database/configBd');

class ProdutoService {
    async buscarRelogios() {
        try {
            await db.initialize();
            const connection = db.getConnection(); 
    
            // Consultar os produtos
            const result = await connection.execute(
                        `SELECT p.id, 
                        p.nome, 
                        p.marca, 
                        p.ano, 
                        p.modelo, 
                        p.codRelogio, 
                        p.genero, 
                        p.tamanho, 
                        p.faixaPreco, 
                        p.valorCompra, 
                        p.preco, 
                        p.descricao,
                        p.ativo,
                        '[' || LISTAGG('{"id":' || i.id || ',"caminho":"' || i.caminho || '"}', ', ') WITHIN GROUP (ORDER BY i.id) || ']' AS imagens,
                        '[' || LISTAGG('{"id":' || c.id || ',"nome":"' || c.nome || '"}', ', ') WITHIN GROUP (ORDER BY c.id) || ']' AS categorias
                 FROM Produto p
                 LEFT JOIN (
                     SELECT pi.produto_id, i.id, i.caminho
                     FROM Produto_Imagem pi
                     JOIN Imagem i ON pi.imagem_id = i.id
                 ) i ON p.id = i.produto_id
                 LEFT JOIN (
                     SELECT pc.produto_id, c.id, c.nome
                     FROM Produto_Categoria pc
                     JOIN Categoria c ON pc.categoria_id = c.id
                 ) c ON p.id = c.produto_id
                 GROUP BY p.id, 
                         p.nome, 
                         p.marca, 
                         p.ano, 
                         p.modelo, 
                         p.codRelogio, 
                         p.genero, 
                         p.tamanho, 
                         p.faixaPreco, 
                         p.valorCompra, 
                         p.preco, 
                         p.descricao,
                         p.ativo`
            );
    
            // Formatar o resultado no formato desejado
            const produtos = result.rows.map(row => {
                return {
                    id: row[0],
                    nome: row[1],
                    marca: row[2],
                    ano: row[3],
                    modelo: row[4],
                    codRelogio: row[5],
                    genero: row[6],
                    tamanho: row[7],
                    faixaPreco: row[8],
                    valorCompra: row[9],
                    preco: row[10],
                    descricao: row[11],
                    ativo: row[12],
                    imagens: JSON.parse(row[13]),
                    categorias: JSON.parse(row[14]),
                };
            });
    
            return produtos;
        } catch (error) {
            console.error("Erro ao obter os produtos:", error);
        }
    }

    async inativarProduto(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE produto SET ativo = 0 WHERE id = :id`,{id: id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async ativarProduto(id) {
        try {
            await db.initialize();
            const connection = db.getConnection();
            const result = await connection.execute(`UPDATE produto SET ativo = 1 WHERE id = :id`,{id: id},{autoCommit: true});
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = ProdutoService;