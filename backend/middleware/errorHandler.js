const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({ message: err.message, stackTower: err.stack }); 
}

module.exports = errorHandler; 