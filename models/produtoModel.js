const db = require('../config/db');

const produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produto (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT produto.*, categorias.nome AS categoria_nome FROM produto JOIN categorias ON produto.categoria = categorias.id WHERE produto.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produto SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [produto.nome, produto.preco, produto.descricao, produto.quantidade, produto.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produto WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT produto.id, produto.nome, produto.descricao, produto.preco, produto.quantidade, categorias.nome AS categoria_nome FROM produto JOIN categorias ON produto.categoria = categorias.id';
        
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }

};

module.exports = produto;