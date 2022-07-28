"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _express = _interopRequireDefault(require("express"));

var _serverController = require("../controller/serverController");

var api = _express["default"].Router();

exports.api = api;
console.log("H:\\PROYECTOS\\Node.js\\MOCKS\\calin_mock\\src\\routes\\index.js (5:0)", "aaaaa");
api.get("/guarda_saved", _serverController.serverController.guarda_saved);
api.get("/guarda_error", _serverController.serverController.guarda_error);
api.get("/login_rem", _serverController.serverController.login_rem);
api.post("/listar_bancoperu", _serverController.serverController.listar_bancoperu);
api.post("/pasagigas_errorgenerico", _serverController.serverController.pasagigas_errorgenerico);
api.post("/pasagigas_validate_error1", _serverController.serverController.pasagigas_validate_error1);