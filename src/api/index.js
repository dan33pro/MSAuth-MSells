const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const config = require('../../config');
const user = require('./components/user/network.js');
const auth = require('./components/auth/network.js');
const errors = require('../tools/network/errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTER
const swaggerDoc = require('./swagger.json');

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Debe ser el ultimo
app.use(errors);

app.listen(config.myAuthService.port, () => {
    console.log('Api escuchando en el puerto ', config.myAuthService.port);
});