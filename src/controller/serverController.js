
const guardasaved = require("../../mock/guarda_gigassaved.json");
const login_rem = require("../../mock/login_rem.json");
const listarbancoperu = require("../../mock/listarbancoperu.json");
const productos = require("../../mock/tienda1.json");


const serverController = {
  
  productos: (_require, response) => {
    response.json(productos);
  },

  guarda_saved: (_require, response) => {
    response.json(guardasaved);
  },
  guarda_error: (_require, response) => {
    response.status(500).send({
      ok: false,
      message: "Error genérico",
    });
  },
  login_rem: (_require, response) => {
    response.json(login_rem);
  },
  listar_bancoperu: (_require, response) => {
    response.json(listarbancoperu);
  },
  pasagigas_errorgenerico: (_require, response) => {
    response.status(500).send({
      identifier: "error1",
      userMessage: {
        title: "Tu línea está inhabilitada para pasar gigas ",
        message:
          "No hay gigas disponibles para pasar.<p>Para poder hacerlo, necesitás tener más de 4GB en tu plan</p>.",
      },
    });
  },
  pasagigas_validate_error1: (_require, response) => {
    response.status(404).send({
      userMessage: "GB_NOAPTO_INSUFICIENT",
    });
  },
  
};

module.exports = { serverController };
