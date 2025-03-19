"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custom_error_1 = require("../errors/custom-error");
var errorHandler = function (err, req, res, next) {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).json({ errors: err.generateErrors() });
    }
    res.status(500).json({ erros: [{ message: 'something went wrong' }] });
};
exports.errorHandler = errorHandler;
