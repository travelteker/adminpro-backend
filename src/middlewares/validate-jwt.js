const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // Capturar Token
  const token = req.header(process.env.HEADER_NAME_FOR_TOKEN);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error, not found <Token> in request',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    // Pasamos la uid a la req para tenerla disponible desde el controlador de ruta
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Error, <Token> not valid',
    });
  }
};

module.exports = {
  validateJWT,
};
