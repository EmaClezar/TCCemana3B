const db = require('../config/db');

const Fornecedor = {
    // Criação de um novo fornecedor
    create: (fornecedor, callback) => {
        const query = 'INSERT INTO fornecedores (nome, email, cpf_cnpj, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [fornecedor.nome, fornecedor.email, fornecedor.cpf_cnpj, fornecedor.telefone, fornecedor.endereco,], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Busca um fornecedor pelo ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM fornecedores WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Busca um fornecedor pelo nome
    findByNome: (nome, callback) => {
        const query = 'SELECT * FROM fornecedores WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Atualiza os dados de um fornecedor
    update: (id, fornecedor, callback) => {
        const query = 'UPDATE fornecedores SET nome = ?, email = ?, cpf_cnpj = ?, telefone = ?, endereco = ? WHERE id = ?';
        db.query(query, [fornecedor.nome, fornecedor.email, fornecedor.cpf_cnpj, fornecedor.telefone, fornecedor.endereco, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Exclui um fornecedor pelo ID
    delete: (id, callback) => {
        const query = 'DELETE FROM fornecedores WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Busca todos os fornecedores
    getAll: (callback) => {
        const query = 'SELECT * FROM fornecedores';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Fornecedor;
