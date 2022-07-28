"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _signale = _interopRequireDefault(require("signale"));

var _cors = _interopRequireDefault(require("cors"));

var _helpers = require("./helpers");

var _routes = require("./routes");

var PORT = process.env.PORT || 3000;
var app = (0, _express["default"])();
app.use((0, _cors["default"])(_helpers.corsOptions));

var server = _http["default"].createServer(app);

server.listen(PORT, function () {
  _signale["default"].success("Server on ".concat(PORT));
});
app.use('/facade', _routes.api);