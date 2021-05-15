/*
  Ruta: /api/upload/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');
const uploadController = require('../controllers/upload_controller');

const router = Router();

// Middleware who will be applied for all routes in this endpoint
router.use(expressFileUpload());

router.put('/:tipo/:id', [validateJWT], uploadController.fileUpload);
router.get('/:tipo/:photo', [validateJWT], uploadController.getImage);

module.exports = router;
