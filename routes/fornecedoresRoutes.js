const express = require('express');
const fornecedorController = require('../controllers/fornecedoresController');
const router = express.Router();

// Rota para listar todos os fornecedores
router.get('/', fornecedorController.getAllFornecedores);

// Rota para renderizar o formulário de criação de um novo fornecedor
router.get('/new', fornecedorController.renderCreateForm);

// Rota para criar um novo fornecedor
router.post('/', fornecedorController.createFornecedor);

// Rota para exibir detalhes de um fornecedor específico
router.get('/:id', fornecedorController.getFornecedorById);

// Rota para renderizar o formulário de edição de um fornecedor
router.get('/:id/edit', fornecedorController.renderEditForm);

// Rota para atualizar os dados de um fornecedor
router.put('/:id', fornecedorController.updateFornecedor);

// Rota para deletar um fornecedor
router.delete('/:id', fornecedorController.deleteFornecedor);

module.exports = router;
