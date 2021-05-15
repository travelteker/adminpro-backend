/*
  Ruta: /api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsBody } = require('../middlewares/validate_fields_body');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require('../controllers/medicos_controller');

const router = Router();

// Middlewares que serán aplicados a todas los ENDPOINTS de esta RUTA </api/medico>
// Todos los ENDPOINT necesitarán un TOKEN válido
// router.use([requestInfo, validateJWT]);

router.get('/', [validateJWT], getMedicos);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is mandatory to create a medical').not().isEmpty(),
    check('hospital', 'ID Hospital must be valid').isMongoId(),
    validateFieldsBody,
  ],
  crearMedico,
);
router.put('/:uid', [], actualizarMedico);
router.delete('/:uid', [], borrarMedico);

module.exports = router;
