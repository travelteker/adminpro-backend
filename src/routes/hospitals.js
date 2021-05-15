/*
  Ruta: /api/hospitals
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsBody } = require('../middlewares/validate_fields_body');
const {
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospitals_controller');
const { validateJWT } = require('../middlewares/validate-jwt');
// const { requestInfo } = require('../middlewares/request-info');

const router = Router();

// Middlewares que serán aplicados a todas los ENDPOINTS de esta RUTA </api/hospital>
// Todos los ENDPOINT necesitarán un TOKEN válido
// router.use([requestInfo, validateJWT]);

router.get('/', [validateJWT], getHospital);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name hospital is mandatory!').not().isEmpty(),
    validateFieldsBody,
  ],
  createHospital,
);
router.put('/:uid', [], updateHospital);
router.delete('/:uid', [], deleteHospital);

module.exports = router;
