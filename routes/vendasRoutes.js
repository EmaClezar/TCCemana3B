const express = require('express');
const vendasController = require('../controllers/vendasController');
const router = express.Router();

router.get('/', vendasController.getAllvendas);
router.get('/new', vendasController.renderCreateForm);
router.post('/', vendasController.createvendas);
router.get('/:id', vendasController.getvendasById);
router.get('/:id/edit', vendasController.renderEditForm);
router.put('/:id', vendasController.updatevendas);
router.delete('/:id', vendasController.deletevendas);

module.exports = router;
