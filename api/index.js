const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const carrito = require('./components/carrito/network');
// const auth = require('./components/auth/network');
//const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

// ROUER
app.use('/api/carrito', carrito);
// app.use('/api/auth', auth);
// app.use('/api/post', post);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});