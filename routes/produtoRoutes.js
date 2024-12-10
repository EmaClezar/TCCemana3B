const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.getAllproduto);
router.get('/new', produtoController.renderCreateForm);
router.post('/', produtoController.createProduto);  
router.get('/list', produtoController.getAllproduto2);
router.get('/:id', produtoController.getProdutoById);  
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', produtoController.updateProduto);  
router.delete('/:id', produtoController.deleteProduto);  

module.exports = router;