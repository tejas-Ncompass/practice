const customError = require('../utils/errorClass');

const validate = (schema) => {
    return (req, res, next) => {
        const error = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const message = error.details.map(i => i.message).join(',');
            throw new customError(`${message}`, 403, `Forbidden`);
        }
        next();
    };
};

module.exports = validate;