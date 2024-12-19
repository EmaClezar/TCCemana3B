const express = require('express');
const clientesController = require('../controllers/clientesController');
const router = express.Router();

// Rotas específicas
router.get('/new', clientesController.renderCreateForm);

// Rotas gerais
router.get('/', clientesController.getAllclientes);
router.post('/', clientesController.createclientes);
router.get('/list', clientesController.getAllclientes);

// Rotas dinâmicas
router.get('/:id', clientesController.getclientesById);
router.get('/:id/edit', clientesController.renderEditForm);
router.put('/:id', clientesController.updateclientes);
router.delete('/:id', clientesController.deleteclientes);

module.exports = router;
