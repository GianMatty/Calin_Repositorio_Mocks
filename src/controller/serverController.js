
const guardasaved = require("../../mock/guarda_gigassaved.json");
const login_rem = require("../../mock/login_rem.json");
const listarbancoperu = require("../../mock/listarbancoperu.json");
const productos = require("../../mock/tienda1.json");
const productos2 = require("../../mock/tienda2.json");
const path = require("path");
const XLSX = require("xlsx");


const parse = () => {
    const excelData = XLSX.readFile(__dirname + "/tienda360.xlsx");
    const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }))
  
    return parseExcelData[0].data;
}
// const parse = () => {
//     const excelData = XLSX.readFile(path.join(__dirname, "../data/tienda360.xlsx"));
//     const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
//         name,
//         data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
//     }))
  
//     return parseExcelData[0].data;
// }



const serverController = {

  // =============== MIO ====================
  productos: (_require, response) => {
    try {
      const dataProductos = parse();
      response.json(dataProductos);
    } catch (error) {
      response.json(error);
    }
  },
  productos2: (_require, response) => {
    const dataProductos = productos2;
    response.json(dataProductos);
  },

  // =============== OTROS EJEMPLOS ====================
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

  // =============== END ====================
  
};

module.exports = { serverController };
