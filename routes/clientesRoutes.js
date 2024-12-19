const express = require('express');
const clientesController = require('../controllers/clientesController');
const router = express.Router();

// Rota para renderizar o formulário de criação de cliente
router.get('/new', clientesController.renderCreateForm);

// Rota para listar todos os clientes
router.get('/', clientesController.getAllclientes);

// Rota para criar um novo cliente
router.post('/', clientesController.createclientes);

// Rotas dinâmicas
router.get('/:id', clientesController.getclientesById);
router.get('/:id/edit', clientesController.renderEditForm);
router.put('/:id', clientesController.updateclientes);
router.delete('/:id', clientesController.deleteclientes);

module.exports = router;
