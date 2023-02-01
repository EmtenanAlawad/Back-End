const { STATUS_CODES } = require('http');

/**
 * A simple logger middleware that logs the request method and path.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
module.exports = (req, res, next) => {
    const { method, url } = req;

    res.removeHeader('X-Powered-By');

    console.info(`${method.toUpperCase()} ${url}`);

    next();
};


