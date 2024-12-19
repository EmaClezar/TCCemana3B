const vendas = require('../models/vendasModel');

const vendasController = {
    createvendas: (req, res) => {
        const newvendas = {
            data_vendas: req.body.data_vendas,
            valor_total: req.body.valor_total,
        };

        vendas.create(newvendas, (err, vendasId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas'); // Redireciona para a lista de vendas
        });
    },

    getvendasById: (req, res) => {
        const vendasId = req.params.id;

        vendas.findById(vendasId, (err, venda) => { // A variável é 'venda', não 'vendas'
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/show', { venda }); // A variável é 'venda'
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

        vendas.findById(vendasId, (err, venda) => { // A variável é 'venda'
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/edit', { venda }); // A variável é 'venda'
        });
    },

    updatevendas: (req, res) => {
        const vendasId = req.params.id;
        const updatedvendas = {
            data_vendas: req.body.data_vendas,
            valor_total: req.body.valor_total,
        };

        vendas.update(vendasId, updatedvendas, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas'); // Redireciona após a atualização
        });
    },

    deletevendas: (req, res) => {
        const vendasId = req.params.id;

        vendas.delete(vendasId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas'); // Redireciona após a exclusão
        });
    },
};

module.exports = vendasController;
