const { response } = require('express');
const Hospital = require('../models/hospital');

class HospitalController {
  async getHospital(req, res = response) {
    const hospitales = await Hospital.find().populate('user', 'name email');
    res.json({
      ok: true,
      msg: { hospitales },
    });
  }

  async createHospital(req, res = response) {
    const uid = req.uid;
    const hospital = new Hospital({
      user: uid,
      ...req.body,
    });

    try {
      const hospital_new = await hospital.save();
      res.json({
        ok: true,
        msg: hospital_new,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Please contact with support!',
      });
    }
  }

  updateHospital(req, res = response) {
    res.json({
      ok: true,
      msg: 'updateHospital',
    });
  }

  deleteHospital(req, res = response) {
    res.json({
      ok: true,
      msg: 'deleteHospital',
    });
  }
}
module.exports = new HospitalController();
