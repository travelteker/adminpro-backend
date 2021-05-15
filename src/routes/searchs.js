/*
  Ruta: /api/search/
*/

const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const SearchController = require('../controllers/search_controller');

const router = Router();

router.get('/:value', [validateJWT], SearchController.getSearch);
router.get(
  '/coleccion/:tabla/:value',
  [validateJWT],
  SearchController.getDocumentosColeccion,
);
module.exports = router;
