const cargaController = require("../controllers/carga_index");
module.exports = (app) => {
  app.route("/save").get(cargaController.getUsuarios);  
};
  