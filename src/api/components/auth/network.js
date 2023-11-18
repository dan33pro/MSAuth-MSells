const express = require("express");

const response = require("../../../tools/network/response");
const controller = require("./index");

const router = express.Router();
router.post("/login", login);

function login(req, res, next) {
  controller
    .login(req.body.correo, req.body.userPassword)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(next);
}

module.exports = router;
