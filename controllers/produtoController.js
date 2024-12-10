const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {

    createProduto: (req, res) => {
        const newProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Produto.create(newProduto, (err, produtoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produto');  // Ajustado para o caminho correto
        });
    },

    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produto/show', { produto });
        });
    },
    
    getAllproduto: (req, res) => {
        Produto.getAll((err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produto/index', { produto });
        });
    },

    getAllproduto2: (req, res) => {
        Produto.getAll((err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produto/list', { produto });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produto/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('produto/edit', { produto, categorias });
            });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        
        const updatedProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produto'); 
        });
    },

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produto');  
        });
    }
};

module.exports = produtoController;
