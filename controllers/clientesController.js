const clientes = require('../models/clientesModel');

const clientesController = {
    // Cria um novo clientes
    createclientes: (req, res) => {
        const newclientes = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        };

        clientes.create(newclientes, (err, clientesId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    // Busca um clientes pelo ID
    getclientesById: (req, res) => {
        const clientesId = req.params.id;

        clientes.findById(clientesId, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!clientes) {
                return res.status(404).json({ message: 'clientes não encontrado' });
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
                return res.status(404).json({ message: 'clientes não encontrado' });
            }
            res.render('clientes/edit', { clientes });
        });
    },

    // Atualiza os dados de um clientes
    updateclientes: (req, res) => {
        const clientesId = req.params.id;
        const updatedclientes = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        };

        clientes.update(clientesId, updatedclientes, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    // Exclui um clientes pelo ID
    deleteclientes: (req, res) => {
        const clientesId = req.params.id;

        clientes.delete(clientesId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    }
};

module.exports = clientesController;
