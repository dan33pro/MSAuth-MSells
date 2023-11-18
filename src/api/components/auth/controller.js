const TABLA = {
    name: "Autenticacion",
    pk: "id_usuario",
};
const auth = require("../../../tools/auth/index");
const error = require("../../../tools/utils/error");
const bcrypt = require("bcrypt");

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require("../../../tools/store/mysql");
    }

    async function login(correo, userPassword) {
        const TABLAUSERS = {
            name: "Usuarios",
            pk: "id_usuario",
        };
        const dataUser = (await store.query(TABLAUSERS, {
            correo: correo,
        }))[0];
        const data = (await store.query(TABLA, { id_usuario: dataUser.id_usuario }))[0];
        return bcrypt
            .compare(userPassword, data.userPassword)
            .then((sonIguales) => {
                if (sonIguales) {
                    // Generar Token
                    let res = {
                        token: auth.sign(data),
                        id_rol: dataUser.id_rol
                    }
                    return  res;
                } else {
                    throw error("Información invalida", 418);
                }
            });
    }

    async function upsert(data, accion) {
        const authData = {};

        if (data.id_usuario) {
            authData.id_usuario = data.id_usuario;
        }
        if (data.userPassword) {
            authData.userPassword = await bcrypt.hash(data.userPassword, 5);
        }
        return store.upsert(TABLA, authData, accion);
    }

    return {
        upsert,
        login,
    };
};
