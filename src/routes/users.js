/*
Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsBody } = require('../middlewares/validate_fields_body')
const { validateJWT } = require('../middlewares/validate-jwt');
const { requestInfo } = require('../middlewares/request-info');
const UserController = require('../controllers/users_controller');

const router = Router();

// Middlewares mandatory to apply all routes for this controller
router.use([requestInfo, validateJWT]);

router.get('/', UserController.getUsers);

/* argumentos ruta --> (<endoint>, <middlewares aplicados a esta ruta>, <controlador>) */
router.post(
  '/',
  [
    check('name', 'Field <name> is mandatory').not().isEmpty(),
    check('password', 'Field <password> is mandatory with min Length (6)')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check('email', 'Field <email> is mandatory').isEmail(),
    validateFieldsBody,
  ],
  UserController.createUser,
);

router.put(
  '/:uid',
  [
    check('name', 'Field <name> is mandatory').not().isEmpty(),
    check('email', 'Field <email> is mandatory').isEmail(),
    check('role', 'Field <role> is mandatory').not().isEmpty(),
    validateFieldsBody,
  ],
  UserController.updateUser,
);

router.delete('/:uid', UserController.deleteUser);

module.exports = router;
