const express = require('express');
const { serverController }  = require("../controller/serverController");

const api = express.Router();

api.get("/productos_exel1", serverController.productos_exel1);
api.get("/productos_exel2", serverController.productos_exel2);
api.get("/productos_array", serverController.productos_array);
api.get("/productos_json", serverController.productos_json);

api.get("/guarda_saved", serverController.guarda_saved);
api.get("/guarda_error", serverController.guarda_error);
api.get("/login_rem", serverController.login_rem);
api.post("/listar_bancoperu", serverController.listar_bancoperu);
api.post("/pasagigas_errorgenerico", serverController.pasagigas_errorgenerico);
api.post(
  "/pasagigas_validate_error1",
  serverController.pasagigas_validate_error1
);

module.exports = { api };
