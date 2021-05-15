const { getClientIp } = require('@supercharge/request-ip');
const { lookup } = require('geoip-lite');

const requestInfo = (req, res, next) => {
  req.info = {};
  const endpoint = req.originalUrl;
  try {
    const ip = getClientIp(req);
    if (!ip) {
      return res.status(500).json({
        ok: false,
        msg: 'Error, <Request Info> failure',
      });
    }
    if (ip !== '127.0.0.1') {
      const info = lookup(ip);
      info.ip = ip;
      req.info = info;
    } else {
      req.info = { ip };
    }
    req.info.baseUrl = endpoint;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Error, <Request Info> failure',
    });
  }
};

module.exports = {
  requestInfo,
};
