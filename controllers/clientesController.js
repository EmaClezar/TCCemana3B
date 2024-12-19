const clientes = require('../models/clientesModel');

const clientesController = {
    // Cria um novo cliente
    createclientes: (req, res) => {
        const { nome, email, telefone, endereco, cpf, divida } = req.body;

        // Verifica se o campo 'divida' foi preenchido
        if (!divida) {
            return res.status(400).json({ message: 'Valor da dívida é obrigatório.' });
        }

        // Verifica se o campo 'endereco' foi preenchido
        if (!endereco) {
            return res.status(400).json({ message: 'Endereço é obrigatório.' });
        }

        const newCliente = { nome, email, telefone, endereco, cpf, valorDivida: divida };

        clientes.create(newCliente, (err, clienteId) => {  // Alterado para 'clienteId' para manter a consistência
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após criação bem-sucedida
        });
    },

    // Busca um cliente pelo ID
    getclientesById: (req, res) => {
        const clienteId = req.params.id;

        // Alteração para buscar corretamente o cliente
        clientes.findById(clienteId, (err, cliente) => { // Alterado de 'clientes' para 'cliente'
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            // Passando o objeto 'cliente' para a view corretamente
            res.render('clientes/show', { cliente });
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
        const clienteId = req.params.id;

        // Alteração para passar o cliente correto
        clientes.findById(clienteId, (err, cliente) => { // Alterado de 'clientes' para 'cliente'
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { cliente }); // Passa o 'cliente' corretamente
        });
    },

    // Atualiza os dados de um cliente
    updateclientes: (req, res) => {
        const clienteId = req.params.id;
        const { nome, email, telefone, endereco, cpf, divida } = req.body;

        // Verifica se o campo 'divida' foi preenchido
        if (!divida) {
            return res.status(400).json({ message: 'Valor da dívida é obrigatório.' });
        }

        // Verifica se o campo 'endereco' foi preenchido
        if (!endereco) {
            return res.status(400).json({ message: 'Endereço é obrigatório.' });
        }

        const updatedCliente = { nome, email, telefone, endereco, cpf, valorDivida: divida };

        clientes.update(clienteId, updatedCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após atualização bem-sucedida
        });
    },

    // Exclui um cliente pelo ID
    deleteclientes: (req, res) => {
        const clienteId = req.params.id;

        clientes.delete(clienteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes'); // Redireciona após exclusão bem-sucedida
        });
    }
};

module.exports = clientesController;
