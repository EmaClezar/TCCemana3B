const express = require('express');
const router = express.Router();
const clientes = require('../models/clientesModel');

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const allClientes = await clientes.getAll();
        res.json(allClientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar um cliente específico pelo ID
router.get('/:id', async (req, res) => {
    const clienteId = req.params.id;
    try {
        const cliente = await clientes.findById(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    const novoCliente = req.body;
    try {
        const clienteId = await clientes.create(novoCliente);
        res.status(201).json({ message: 'Cliente criado com sucesso', clienteId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar um cliente pelo ID
router.put('/:id', async (req, res) => {
    const clienteId = req.params.id;
    const dadosAtualizados = req.body;
    try {
        const affectedRows = await clientes.update(clienteId, dadosAtualizados);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: `Cliente com ID ${clienteId} atualizado com sucesso` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para excluir um cliente pelo ID
router.delete('/:id', async (req, res) => {
    const clienteId = req.params.id;
    try {
        const affectedRows = await clientes.delete(clienteId);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: `Cliente com ID ${clienteId} excluído com sucesso` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Exporta o router para ser usado no app.js
module.exports = router;
