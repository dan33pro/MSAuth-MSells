const auth = require('../auth');
const TABLA = {
    name: 'Usuarios',
    pk: 'id_usuario',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    async function upsert(body) {
        const user = {
            id_usuario: body.id_usuario,
            nombres: body.nombres,
            apellidos: body.apellidos,
            correo: body.correo,
            codPais: body.codPais,
            numeroCelular: body.numeroCelular,
            id_rol: body.id_rol,
        };
        if (
            body.accion == 'insert' &&
            (!user.nombres || !user.apellidos
                || !user.correo || !user.codPais || !user.numeroCelular 
                || !user.id_rol || !body.userPassword)) {
            return Promise.reject('No se indico la información necesaria');
        }

        const response = await store.upsert(TABLA, user, body.accion);
        const usuario = await store.query(TABLA, { correo: user.correo });
        const id_usuario = usuario[0].id_usuario;
        
        if (body.userPassword && id_usuario) {
            await auth.upsert({
                id_usuario: id_usuario,
                userPassword: body.userPassword,
            }, body.accion);
        }
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del usario');
        }
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};