/*
Ruta: /api/users
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsBody } = require('../middlewares/validate_fields_body');
// const { getUsers, createUser, updateUser } = require('../controllers/usuarios');
const { updateUser, createUser, getUsers, deleteUser } = require('../controllers/users_controller'); 
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Middlewares que serán aplicados a todas los ENDPOINTS de esta RUTA </api/users>
// Todos los ENDPOINT necesitarán un TOKEN válido
router.use([validateJWT]);

router.get('/', getUsers);

/* argumentos ruta --> (<endoint>, <middlewares aplicados a esta ruta>, <controlador>) */
router.post(
    '/',
    [
        check('name', 'Field <name> is mandatory').not().isEmpty(),
        check('password', 'Field <password> is mandatory with min Length (6)').not().isEmpty().isLength({ min: 6 }),
        check('email', 'Field <email> is mandatory').isEmail(),
        validateFieldsBody
    ],
    createUser
);

router.put(
    '/:uid',
    [
        check('name', 'Field <name> is mandatory').not().isEmpty(),
        check('email', 'Field <email> is mandatory').isEmail(),
        check('role', 'Field <role> is mandatory').not().isEmpty(),
        validateFieldsBody
    ],
    updateUser
);

router.delete('/:uid', deleteUser);


module.exports = router;