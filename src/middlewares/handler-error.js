const { response } = require('express');

const { GeneralError, NotFound } = require('../helpers/error');

/** handler for 404 routes. */
const error404 = (req, res = response, next) => {
  const endpoint = req.originalUrl;
  const err = new NotFound(`Not found path <${endpoint}>`);
  next(err);
};

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      ok: false,
      msg: err.message,
    });
  }

  return res.status(500).json({
    ok: false,
    msg: err.message,
  });
};

module.exports = {
  error404,
  handleErrors,
};
