const db = require('../config/db');

const vendas = {
    create: (vendas, callback) => {
        const query = 'INSERT INTO vendas (data_vendas, valor_total) VALUES (?, ?)';
        db.query(query, [vendas.data_vendas, vendas.valor_total], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, vendas, callback) => {
        // Corrigido: removido o erro de sintaxe na consulta SQL
        const query = 'UPDATE vendas SET data_vendas = ?, valor_total = ? WHERE id = ?';
        db.query(query, [vendas.data_vendas, vendas.vendas_valor, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByProductName: (productName, callback) => {
        const query = `
            SELECT vendas.* 
            FROM vendas 
            JOIN produtos ON vendas.id_produto = produtos.id 
            WHERE produtos.nome LIKE ?
        `;
        db.query(query, [`%${productName}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = vendas;
