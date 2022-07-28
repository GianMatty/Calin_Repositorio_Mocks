"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverController = void 0;

var _guarda_gigassaved = _interopRequireDefault(require("../../mock/guarda_gigassaved.json"));

var _login_rem2 = _interopRequireDefault(require("../../mock/login_rem.json"));

var _listarbancoperu = _interopRequireDefault(require("../../mock/listarbancoperu.json"));

var serverController = {
  guarda_saved: function guarda_saved(_require, response) {
    console.log("H:\\PROYECTOS\\Node.js\\MOCKS\\calin_mock\\src\\controller\\serverController.js (11:4)", "response111");
    response.json(_guarda_gigassaved["default"]);
  },
  guarda_error: function guarda_error(_require, response) {
    response.status(500).send({
      ok: false,
      message: "Error genérico"
    });
  },
  login_rem: function login_rem(_require, response) {
    response.json(_login_rem2["default"]);
  },
  listar_bancoperu: function listar_bancoperu(_require, response) {
    response.json(_listarbancoperu["default"]);
  },
  pasagigas_errorgenerico: function pasagigas_errorgenerico(_require, response) {
    response.status(500).send({
      identifier: "error1",
      userMessage: {
        title: "Tu línea está inhabilitada para pasar gigas ",
        message: "No hay gigas disponibles para pasar.<p>Para poder hacerlo, necesitás tener más de 4GB en tu plan</p>."
      }
    });
  },
  pasagigas_validate_error1: function pasagigas_validate_error1(_require, response) {
    response.status(404).send({
      userMessage: "GB_NOAPTO_INSUFICIENT"
    });
  }
};
exports.serverController = serverController;