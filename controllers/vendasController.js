//crie o conteudo deste arquivo vendasController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, , produto_id

const vendas = require('../models/vendasModel');

const vendasController = {
    createvendas: (req, res) => {
        const newvendas = {
            data: req.body.data_vendas,
            valor: req.body.valor_total,
            
        };

        vendas.create(newvendas, (err, vendasId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    getvendasById: (req, res) => {
        const vendasId = req.params.id;

        vendas.findById(vendasId, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!vendas) {
                return res.status(404).json({ message: 'vendas not found' });
            }
            res.render('vendas/show', { vendas });
        });
    },

    getAllvendas: (req, res) => {
        vendas.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/index', { vendas });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    renderEditForm: (req, res) => {
        const vendasId = req.params.id;

        vendas.findById(vendasId, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!vendas) {
                return res.status(404).json({ message: 'vendas not found' });
            }
            res.render('vendas/edit', { vendas });
        });
    },

    updatevendas: (req, res) => {
        const vendasId = req.params.id;
        const updatedvendas = {
            data: req.body.data_vendas,
            valor: req.body.valor_total,
            
        };

        vendas.update(vendasId, updatedvendas, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    deletevendas: (req, res) => {
        const vendasId = req.params.id;

        vendas.delete(vendasId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    }
};

module.exports = vendasController;