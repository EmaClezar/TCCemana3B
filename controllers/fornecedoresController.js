const Fornecedor = require('../models/fornecedoresModel');

const fornecedorController = {
    // Cria um novo fornecedor
    createFornecedor: (req, res) => {
        const newFornecedor = {
            nome: req.body.nome,
            email: req.body.email,
            cpf_cnpj: req.body.cpf_cnpj,
            telefone: req.body.telefone,
            endereco: req.body.endereco 
        };

        Fornecedor.create(newFornecedor, (err, fornecedorId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    // Busca um fornecedor pelo ID
    getFornecedorById: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.render('fornecedores/show', { fornecedor });
        });
    },

    // Busca todos os fornecedores
    getAllFornecedores: (req, res) => {
        Fornecedor.getAll((err, fornecedores) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('fornecedores/index', { fornecedores });
        });
    },

    // Renderiza o formulário de criação de fornecedor
    renderCreateForm: (req, res) => {
        res.render('fornecedores/create');
    },

    // Renderiza o formulário de edição de fornecedor
    renderEditForm: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.render('fornecedores/edit', { fornecedor });
        });
    },

    // Atualiza os dados de um fornecedor
    updateFornecedor: (req, res) => {
        const fornecedorId = req.params.id;
        const updatedFornecedor = {
            nome: req.body.nome,
            email: req.body.email,
            cpf_cnpj: req.body.cpf_cnpj,
            telefone: req.body.telefone,
            endereco: req.body.endereco // Exemplo: incluindo um campo de endereço
        };

        Fornecedor.update(fornecedorId, updatedFornecedor, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    // Exclui um fornecedor pelo ID
    deleteFornecedor: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.delete(fornecedorId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    }
};

module.exports = fornecedorController;
