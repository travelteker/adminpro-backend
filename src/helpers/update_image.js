const User = require('../models/user');
const Medic = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (tipo, id, filename) => {
  let oldPath = './src/uploads/'
  switch (tipo) {
    case 'medicos':
      try {
        const medico = await Medic.findById(id);
        if (!medico) {
            return false;
        }

        oldPath += `${tipo}/${ medico.image }`;
        deleteImage(oldPath);

        medico.image = filename;
        await medico.save();
        return true;
      } catch (err) {
        return false;
      }
      break;
      
    case 'hospitals':
      try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return false;
        }

        oldPath += `${tipo}/${ hospital.image }`;
        deleteImage(oldPath);

        hospital.image = filename;
        await hospital.save();
        return true;
      } catch (err) {
        return false;
      }
      break;
      
    case 'users':
      try {
        const user = await User.findById(id);
        if (!user) {
            return false;
        }

        oldPath += `${tipo}/${user.image}`;
        deleteImage(oldPath);
        user.image = filename;
        await user.save();
        return true;
      } catch (err) {
        return false;
      }
      break;
  }
}

module.exports = {
  updateImage,
  deleteImage,
};
