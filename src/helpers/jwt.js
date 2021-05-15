const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
  // Devolvemos una promesa para poder utilizar en llamadas con funciones AWAIT
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          reject('Failure to generate JWT');
        } else {
          resolve(token);
        }
      },
    );
  });
};

module.exports = {
  generarJWT,
};
