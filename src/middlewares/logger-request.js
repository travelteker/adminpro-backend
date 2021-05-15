const { logger, request } = require('../config/custom_logger');

const register = logger(request());
const loggerRequest = (req, res, next) => {
  const ip = req.ip;
  const path = req.originalUrl;
  const method = req.method;
  const headers = req.headers;
  const body = req.body;
  register.info({ ip, method, path, headers, body });
  next();
};

module.exports = {
  loggerRequest,
};
