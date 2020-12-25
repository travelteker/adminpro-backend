const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFieldsBody = (req, res = response, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        let aux = {}
        for (const [key, value] of Object.entries(errores.mapped())) {
            delete value.param
            delete value.location
            aux[key] = value
        }
        return res.status(400).json({
            ok: false,
            errors: aux
        });
    }
    next();
};


module.exports = {
    validateFieldsBody
}