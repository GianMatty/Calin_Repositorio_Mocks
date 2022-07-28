"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
var corsOptions = {
  origin: true,
  methods: 'GET, PUT, POST',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-app-id, msisdn, Authorization, novum_authorization'
};
exports.corsOptions = corsOptions;