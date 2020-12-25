const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    // TODO --> Implementar sistema de control de reintentos para evitar ataque de BOTS o SCRIPTS

    const { email, password } = req.body;
    try {
        // Verificar si exsite el email
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Data user failed'
            });
        }
        // Verificar la contaseña para ese email
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Data user failed'
            });
        }

        // GENERAR JWT JsonWebToken
        // <_id> or <id> is the IDENTIFICATOR for document in MongoDB
        const token = await generarJWT( userDB.id);
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with support'
        })
    }
}

module.exports = {
    login
}