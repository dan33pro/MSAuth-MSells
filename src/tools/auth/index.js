const jwt = require('jsonwebtoken');
const config = require('../../../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene Token', 401);
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function verify(token) {
    return jwt.verify(token, secret);
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        // Comprobar si es o no propio
        if (decoded.id_usuario != owner || !owner) {
            throw error('No puedes hacer esto', 403);
        }
    },
};

module.exports = {
    sign,
    check,
};