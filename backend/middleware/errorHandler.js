const { constants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTower: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTower: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTower: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTower: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTower: err.stack
            });
            break;
        default:
            console.log("No Error, All good!")
            break;
    }

}

module.exports = errorHandler; 