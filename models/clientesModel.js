const db = require('../config/db'); // Supondo que a conexão com o banco está configurada no arquivo db.js

const Clientes = {
    // Criação de um novo cliente
    create: (cliente, callback) => {
        if (!cliente.nome || !cliente.endereco) {
            return callback(new Error("Nome e endereço são obrigatórios"));
        }

        // Verifica se o valorDivida não é null ou vazio
        if (cliente.valorDivida === undefined || cliente.valorDivida === null || cliente.valorDivida === '') {
            return callback(new Error("Valor da dívida é obrigatório"));
        }

        const query = `
            INSERT INTO clientes (nome, email, telefone, endereco, cpf, valorDivida)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [cliente.nome, cliente.email, cliente.telefone, cliente.endereco, cliente.cpf, cliente.valorDivida],
            (err, results) => {
                if (err) {
                    console.error('Erro ao criar cliente:', err.message);
                    return callback(err);
                }
                callback(null, results.insertId); // Retorna o ID do cliente criado
            }
        );
    },

    // Busca um cliente pelo ID
    findById: (id, callback) => {
        if (!id) {
            return callback(new Error("ID do cliente é necessário"));
        }

        const query = 'SELECT * FROM clientes WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar cliente por ID:', err.message);
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null); // Cliente não encontrado
            }
            callback(null, results[0]); // Retorna o primeiro registro encontrado
        });
    },

    // Atualiza os dados de um cliente
    update: (id, cliente, callback) => {
        if (!id || !cliente.nome || !cliente.endereco) {
            return callback(new Error("ID, nome e endereço são obrigatórios"));
        }

        // Verifica se o valorDivida não é null ou vazio
        if (cliente.valorDivida === undefined || cliente.valorDivida === null || cliente.valorDivida === '') {
            return callback(new Error("Valor da dívida é obrigatório"));
        }

        const query = `
            UPDATE clientes
            SET nome = ?, email = ?, telefone = ?, endereco = ?, cpf = ?, valorDivida = ?
            WHERE id = ?
        `;
        db.query(
            query,
            [cliente.nome, cliente.email, cliente.telefone, cliente.endereco, cliente.cpf, cliente.valorDivida, id],
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar cliente:', err.message);
                    return callback(err);
                }
                if (results.affectedRows === 0) {
                    return callback(null, null); // Cliente não encontrado
                }
                callback(null, results);
            }
        );
    },

    // Exclui um cliente pelo ID
    delete: (id, callback) => {
        if (!id) {
            return callback(new Error("ID do cliente é necessário"));
        }

        const query = 'DELETE FROM clientes WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Erro ao excluir cliente:', err.message);
                return callback(err);
            }
            if (results.affectedRows === 0) {
                return callback(null, null); // Cliente não encontrado
            }
            callback(null, results);
        });
    },

    // Busca todos os clientes
    getAll: (callback) => {
        const query = 'SELECT * FROM clientes';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar todos os clientes:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Clientes;
