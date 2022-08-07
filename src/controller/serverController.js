
const guardasaved = require("../../mock/guarda_gigassaved.json");
const login_rem = require("../../mock/login_rem.json");
const listarbancoperu = require("../../mock/listarbancoperu.json");
const tienda_array = require("../../mock/tienda_array.json");
const tienda_json = require("../../mock/tienda_json.json");
const path = require("path");
const XLSX = require("xlsx");


const serverController = {

  // =============== MIO ====================
// Nota: Forma optima de parsear los datos para la tienda
  productos_exel_final: (_require, response) => {
    try {
      const exelPath = "/src/data/tienda360_final.xlsx";
      const dataProductos = tienda360Function(exelPath);
      const data = {
        result: dataProductos, 
      }
      response.json(data);
    } catch (error) {
      response.json(error);
    }
  },

// Nota: Segunda Forma de parsear los datos para la tienda
  productos_exel_alternativo: (_require, response) => {
    try {
      const exelPath = "/src/data/tienda360.xlsx";
      const dataProductos = tienda2Function(exelPath);
      const data = {
        result: dataProductos, 
      }
      response.json(data);
    } catch (error) {
      response.json(error);
    }
  },

// Nota: Resumen de los productos parsedos
  productos_exel_resumen: (_require, response) => {
    try {
      const exelPath = "/src/data/tienda360_resumen.xlsx";
      const dataProductos = tienda360FunctionResumen(exelPath);
      response.json(dataProductos);
    } catch (error) {
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


const extraerInfoExcel = (excelPath) => {

  // Nota: Forma 1 de consumir el exel (mejor ya que se evita el problema del path para encontrar el file exel)
  const excelData = XLSX.readFile(path.join(process.cwd() + excelPath));
  // const excelData = XLSX.readFile(path.join(process.cwd() + "/src/data/tienda360_3.xlsx"));
  const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
  }))

  // Nota: Forma 2 de consumir el exel
  // const parse = () => {
  //     // const excelData = XLSX.readFile(path.join(__dirname, "../data/tienda360.xlsx"));
  //     const excelData = XLSX.readFile(path.join(process.cwd() + "../data/tienda360.xlsx"));
  //     const parseExcelData = Object.keys(excelData.Sheets).map((name) => ({
  //         name,
  //         data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
  //     }))

  //     return parseExcelData[0].data;
  // }

  return parseExcelData;
};

const tienda2Function = (excelPath) => {

  const parseExcelData = extraerInfoExcel(excelPath);

  // Nota: extraemos las categorias
  const categories = parseExcelData.map( res => res.data.map( res => res.category )).join(',').split(',');
  const subcategories = parseExcelData.map( res => res.data.map( res => res.subcategory )).join(',').split(',');
  const categoriesFilter = categories.filter( (data, i) => categories.indexOf(data) === i );
  const subcategoriesFilter = subcategories.filter( (data, i) => subcategories.indexOf(data) === i );
  
  // Nota: unimos las diferentes pestañas de exel en un solo arreglo
  const tienda360 = parseExcelData.map( (response) => response.data)
                                  .reduce( (acc, data) => acc.concat(data))
  
 
  // Nota: parseamos las subcategorias
  const subcategoriesParse = subcategoriesFilter.map( (data) => {
    return {
      subcategory: data,
      products: tienda360.filter( (response) => data === response.subcategory )
                      .map( (response) => {
                        return {
                          category: response.category,
                          id: response.id,
                          name: response.name,
                          value: response.value,
                        }
                      })
    }
  })

  // Nota: parseamos las categorias y la unimos con las subcategorias anteriormente parseadas
  const categoriesParse = categoriesFilter.map( (data) => {
    return {
      category: data,
      data: subcategoriesParse.filter( (response) => data === response.products[0].category )
                      .map( (response) => {
                        return {
                          subcategory: response.subcategory,
                          products: response.products.map( res => {
                            return {
                              id: res.id,
                              name: res.name,
                              value: res.value,
                            }
                          }),
                        }
                      })
    }
  })

  
  return categoriesParse;
}

const tienda360Function = (excelPath) => {

  // const excelPath = "/src/data/tienda360_final.xlsx";
  const excelData = extraerInfoExcel(excelPath);

  // Nota: extraemos las categorias
  const categories = excelData.map( res => res.data.map( res => res.category )).join(',').split(',');
  const categoriesFilter = categories.filter( (data, i) => categories.indexOf(data) === i );
  
  // Nota: unimos las diferentes pestañas de exel en un solo arreglo
  const tienda360 = excelData.map( (response) => response.data)
                                  .reduce( (acc, data) => acc.concat(data));


  const categoriesParse = (subcategoriesArray) => {
    // Nota: extraemos las subcategorias
    const subcategories = subcategoriesArray.map( res => res.subcategory ).join(',').split(',');
    const subcategoriesFilter = subcategories.filter( (data, i) => subcategories.indexOf(data) === i );

    const subcategoryArray = subcategoriesFilter.map( (subcategory) => {
      return {
        subcategory: subcategory,
        products: subcategoriesArray.filter( (response) => subcategory === response.subcategory )
                        .map( (product) => {
                          return {
                            id: product.id,
                            name: product.name,
                            value: product.value,
                          }
                        })
      }
    })  
    return subcategoryArray;  
  }

  const tiendaProductsParse = categoriesFilter.map( (category) => {
    return {
      category: category,
      data: categoriesParse(tienda360.filter( (response) => category === response.category ))
    }
  })

  return tiendaProductsParse;
}


const tienda360FunctionResumen = (excelPath) => {

  const excelData = extraerInfoExcel(excelPath);
  return excelData[0].data;
}



module.exports = { serverController };
