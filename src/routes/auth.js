/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth_controller'); 
const { check } = require('express-validator');
const { validateFieldsBody } = require('../middlewares/validate_fields_body')
const router = Router();


router.post(
    '/',
    [
        check('email', 'Field <email> is mandatory').isEmail(),
        check('password', 'Field <password> is mandatory').not().isEmpty(),
        validateFieldsBody
    ],
    login);




module.exports = router;