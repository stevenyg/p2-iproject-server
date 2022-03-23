const errorHandler = (err, req, res, next) => {
    let errors;
    switch (err.name) {
        case "JsonWebTokenError":
            res.status(401).json({ message: 'JWT must be provided' })
            break;
        case "AuthenticationError":
            res.status(401).json({ message: "User not found Authentication Failed" })
            break;
        case "SequelizeValidationError":
            errorMessage = err.errors.map(e => e.message)
            res.status(400).json({ message: errorMessage })
            break;
        case "SequelizeUniqueConstraintError":
            errorMessage = err.errors.map(e => e.message)
            res.status(400).json({ message: errorMessage })
            break;
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = errorHandler