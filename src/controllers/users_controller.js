const { response } = require('express');
const crypto = require('bcrypt');
const User = require('../models/user');


class UserController {


    async getUsers(req, res) {
        const usuarios = await User.find({}, 'name email password role google activated');
        res.json({
            ok: true,
            usuarios
        });
    }
    
    // Para tener disponibles los métodos de response desde Visual Studio Code
    // El objeto response siempre estará disponible y nunca vendrá vacío pero así tenemos acceso a sus métodos
    async createUser(req, res = response) {
        
        const { email, password } = req.body;
        try {
            // Validamos si existe el email
            const emailExist = await User.findOne({email});
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error, usuario no válido'
                });
            }
    
            const usuario = new User(req.body);
            const salt = crypto.genSaltSync();
            usuario.password = crypto.hashSync(password, salt);
            //Por defecto cuando se crea un nuevo usuario se activará
            usuario.activated = true 
            //Por defecto los nuevos usuarios tendrán el rol de <user>
            usuario.role = 'user';
            // Esto es una promesa y tenemos que esperar a que resuelva antes de ejecutar el <res.json>
            await usuario.save();
            res.json({
                ok: true,
                usuario
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado, revisar logs'
            });
        }   
    }
    
    /* 
    Method to update <name>, <email>, <role>, <google>, <activated> fields
    mandatory ---> <name>, <email>
    optional ----> <role>, <google>, <activated>
    */
    async updateUser(req, res = response) {

        const uid = req.params.uid;
        try {
            const existUser = await User.findById(uid);
            if (!existUser) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User not exists'
                });
            }
    
            // Actualizaciones
            // Destructuring para eliminar los campos que no queremos que se actualicen
            const { password, google, email, ...fields } = req.body;
            if (existUser.email !== email) {
                // El usuario está intentando actualizar su email, comprabar que el nuevo email no existe ya en la BD
                const existsEmail = await User.findOne({ email });
                if (existsEmail) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'This email just exists in database'
                    });
                }
            }
            // Añadimos el campo email con el nuevo email valido para que se actualice
            fields.email = email;
            const triggerUpdateUser = await User.findByIdAndUpdate(uid, fields, { new: true });
            res.json({
                ok: true,
                user: triggerUpdateUser
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }
    };

    async deleteUser(req, res = response) {

        const uid = req.params.uid;
        try {
            const existUser = await User.findById(uid);
            if (!existUser) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User not exists'
                });
            }
            // await Usuario.findByIdAndDelete(uid);
            const triggerUpdateUser = await User.findByIdAndUpdate(uid, { activated: false }, { new: true });
            res.json({
                ok: true,
                msg: 'Delete user successfully'
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: 'Error, please contact with support'
            });
        }
    }
}

module.exports = new UserController();