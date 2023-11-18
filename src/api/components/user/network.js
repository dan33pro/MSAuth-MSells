const express = require('express');

const secure = require('./secure');
const response = require('../../../tools/network/response');
const controller = require('./index');

const router = express.Router();
router.get('/', list);
router.get('/:id', get);
router.get('/:key/:value', findByquery);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', secure('remove'), remove);

async function list(req, res) {
    try {
        const lista = await controller.list();
        response.success(req, res, lista, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
    
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
};

function findByquery(req, res, next) {
    controller.findByquery(req.params.key, req.params.value)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch(next);
};

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
};

function remove(req, res, next) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, "Registro eliminado", 202);
        })
        .catch(next);
};

module.exports = router;

