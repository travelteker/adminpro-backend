const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerifyToken } = require('../helpers/google_verify');

const login = async (req, res = response) => {
  // TODO --> Implementar sistema de control de reintentos para evitar ataque de BOTS o SCRIPTS

  const { email, password } = req.body;
  try {
    // Verificar si exsite el email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Data user failed',
      });
    }
    // Verificar la contaseña para ese email
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Data user failed',
      });
    }

    // GENERAR JWT JsonWebToken
    // <_id> or <id> is the IDENTIFICATOR for document in MongoDB
    const token = await generarJWT(userDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact with support',
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerifyToken(googleToken);
    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        password: 'fake',
        image: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    // Save user
    await user.save();
    // GENERAR JWT JsonWebToken
    // <_id> or <id> is the IDENTIFICATOR for document in MongoDB
    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      token,
    });
  } catch (err) {
    res.status(401).json({
      ok: false,
      msg: 'Token invalid, failure google authentication!',
    });
  }
}

module.exports = {
  login,
  googleSignIn,
};
