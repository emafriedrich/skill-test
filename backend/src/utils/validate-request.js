const { ApiError } = require("./api-error");

const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    } catch (error) {
        const formattedErrors = error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));

        throw new ApiError(400, JSON.stringify(formattedErrors) );
    }
}

module.exports = {
    validateRequest
};
