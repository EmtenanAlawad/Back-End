const HttpError = require("../models/http-error.model");

const errorHandlerMiddleware = (error, req, res, _next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';

    if (error instanceof HttpError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    res.status(statusCode).json({
        message,
        statusCode,
    });
}

module.exports = errorHandlerMiddleware;


