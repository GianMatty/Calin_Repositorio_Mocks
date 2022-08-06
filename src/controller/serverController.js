
const guardasaved = require("../../mock/guarda_gigassaved.json");
const login_rem = require("../../mock/login_rem.json");
const listarbancoperu = require("../../mock/listarbancoperu.json");
const tienda_array = require("../../mock/tienda_array.json");
const tienda_json = require("../../mock/tienda_json.json");
const tienda_basico = require("../../mock/tienda_basico.json");
const path = require("path");
const XLSX = require("xlsx");


const serverController = {

  // =============== MIO ====================
  productos_exel1: (_require, response) => {
    try {
      const dataProductos = parse();
      response.json(dataProductos);
    } catch (error) {
      console.log(error)
      response.json(error);
    }
  },
  productos_exel2: (_require, response) => {
    try {
      const dataProductos = parseExel2();
      response.json(dataProductos);
    } catch (error) {
      console.log(error)
      response.json(error);
    }
  },
  productos_json: (_require, response) => {
    const dataProductos = tienda_json;
    response.json(dataProductos);
  },

  productos_array: (_require, response) => {
    const dataProductos = tienda_array;
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


const parse = () => {
  const excelData = XLSX.readFile(path.join(process.cwd() + "/src/data/tienda360_3.xlsx")); 
  const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
  }))

const categories = parseExcelData.map( res => res.data.map( res => res.category )).join(',').split(',');
const subcategories = parseExcelData.map( res => res.data.map( res => res.subcategory )).join(',').split(',');;

const categoriesFilter = categories.filter( (data, i) => categories.indexOf(data) === i );
const subcategoriesFilter = subcategories.filter( (data, i) => subcategories.indexOf(data) === i );


console.log(categoriesFilter)
console.log(subcategoriesFilter)

  return parseExcelData[2].data;
}
// const parse = () => {
//     // const excelData = XLSX.readFile(path.join(__dirname, "../data/tienda360.xlsx"));
//     const excelData = XLSX.readFile(path.join(process.cwd() + "../data/tienda360.xlsx"));
//     const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
//         name,
//         data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
//     }))

//     return parseExcelData[0].data;
// }

const parseExel2 = () => {
  const excelData = XLSX.readFile(path.join(process.cwd() + "/src/data/tienda360_3.xlsx"));
  const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
  }))

  // console.log(parseExcelData[0].data);



  // const data4 = data3.map( (data) => {
  //   return { 
  //     category: data.category_name,
  //     data: [
  //       data.subcategories.map((info) => {
  //         return { 
  //          subcategory: info,
  //          products: []
  //         }
  //       }) 
  //     ]
  //   };
  // })

  let array1 = [];
  let array2 = [];

  const dulces = parseExcelData[0].data
  const data10 = parseExcelData.map( (response) => {
    response.data.reduce( (acc, data) => {
      return acc = acc.push(data.category)
      // {
      //   category: array1.push(data.category),
      //   subcategory: array2.push(data.subcategory),
      // }
    })
    
  })
  console.log(data10);

  const dulcesData = dulces.map( (data) => data.subcategory)
  const dulcesSubcategories = dulcesData.filter( (data, i) => dulcesData.indexOf(data) === i );

  const dulcesParse = dulcesSubcategories.map( (data) => {
    return {
      subcategory: data,
      products: dulces.filter( (response) => data === response.subcategory )
                      .map( (response) => {
                        return {
                          id: response.id,
                          name: response.name,
                          value: response.value,
                        }
                      })
    }
  })
  
  const tienda1 = {
    "result": [
      {
        "category": "ABARROTES",
        "data": [
          {
            "subcategory": "Fideos",
            "products": parseExcelData[0].data
          },
          {
            "subcategory": "Atunes",
            "products": [{"name": "florida filete", "value": 6}, {"name": "atun AZ", "value": 3.50}]
          }
        ] 
      },
      {
        "category": "DULCES",
        "data": [
          {
            "subcategory": "Galletas",
            "products": [{"name": "rellenitas", "value": 0.50}, {"name": "tentacion", "value": "0.70"}]
          },
          {
            "subcategory": "Chocolates",
            "products": [{"name": "princesa", "value": "1.50"}, {"name": "cañonazo", "value": "0.80"}]
          }
        ] 
      },
      {
        "category": "BEBIDAS",
        "data": [
          {
            "subcategory": "Gaseosas",
            "products": [{"name": "pepsi jumbo", "value": 2.50}, {"name": "pepsi chico", "value": "1.80"}]
          },
          {
            "subcategory": "Yogurt",
            "products": [{"name": "gloria chico", "value": "1.50"}, {"name": "gloria 1/2 litro", "value": "3.50"}]
          }
        ] 
      }
    ]
  }
  

  return dulcesParse;
}




module.exports = { serverController };
