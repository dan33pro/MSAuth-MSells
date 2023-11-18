const auth = require('../../../tools/auth');

module.exports = function checkAuth(action) {

    function middlewware(req, res, next) {
        switch(action) {
            case 'update':
                let ownerU = req.body.id_usuario;
                auth.check.own(req, ownerU);
                next();
                break;
            case 'remove':
                let ownerR = req.params.id;
                auth.check.own(req, ownerR);
                next();
                break;
            default:
                next();
        }
    }

    return middlewware;
};