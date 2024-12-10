const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Importação das rotas
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const vendasRoutes = require('./routes/vendaRoutes');
const clientesRoutes = require('./routes/clientesRoutes'); // Rota de clientes adicionada
const fornecedoresRoutes = require('./routes/fornecedoresRoutes'); // Rota de fornecedores adicionada

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS com layout
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Suporte para PUT e DELETE via formulários HTML

// Rotas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produto', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/clientes', clientesRoutes); 
app.use('/fornecedores', fornecedoresRoutes); 
app.use('/vendas', vendasRoutes); 

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
