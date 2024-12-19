const clientes = require('../models/clientesModel');

const clientesController = {
    // Cria um novo cliente
    createclientes: (req, res) => {
        const { nome, email, telefone, endereco, cpf, divida } = req.body;

        // Verifica se o campo endereco foi preenchido
        if (!endereco) {
            return res.status(400).json({ message: 'Endereço é obrigatório.' });
        }

        const newclientes = { nome, email, telefone, endereco, cpf, valorDivida: divida };

        clientes.create(newclientes, (err, clientesId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após criação bem-sucedida
        });
    },

    // Busca um cliente pelo ID
    getclientesById: (req, res) => {
        const clientesId = req.params.id;

        clientes.findById(clientesId, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!clientes) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/show', { clientes });
        });
    },

    // Busca todos os clientes
    getAllclientes: (req, res) => {
        clientes.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('clientes/index', { clientes });
        });
    },

    // Renderiza o formulário de criação de clientes
    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    // Renderiza o formulário de edição de clientes
    renderEditForm: (req, res) => {
        const clientesId = req.params.id;

        clientes.findById(clientesId, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!clientes) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { clientes });
        });
    },

    // Atualiza os dados de um cliente
    updateclientes: (req, res) => {
        const clientesId = req.params.id;
        const { nome, email, telefone, endereco, cpf, divida } = req.body;

        // Verifica se o campo endereco foi preenchido
        if (!endereco) {
            return res.status(400).json({ message: 'Endereço é obrigatório.' });
        }

        const updatedclientes = { nome, email, telefone, endereco, cpf, valorDivida: divida };

        clientes.update(clientesId, updatedclientes, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após atualização bem-sucedida
        });
    },

    // Exclui um cliente pelo ID
    deleteclientes: (req, res) => {
        const clientesId = req.params.id;

        clientes.delete(clientesId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após exclusão bem-sucedida
        });
    }
};

module.exports = clientesController;
