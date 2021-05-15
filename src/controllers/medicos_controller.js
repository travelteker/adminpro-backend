const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos =  async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('user', 'name email')
    .populate('hospital', 'name');
  res.json({
    ok: true,
    msg: { medicos },
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    user: uid,
    ...req.body,
  });
  try {
    const medico_new = await medico.save();
    res.json({
      ok: true,
      msg: medico_new,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please, contact with support, something was wrong!',
    });
  }
};

const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarMedico',
  });
};

const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'borrarMedico',
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
