/*
    fileUpload
*/

const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { BadRequest } = require('../helpers/error');
const { updateImage, deleteImage } = require('../helpers/update_image');

class UploadController {
  fileUpload(req, res = response) {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitals', 'medicos', 'users'];
    if (!tiposValidos.includes(tipo)) {
      throw new BadRequest(`<tipo> '${tipo}' is not valid.`);
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new BadRequest('Not found file to upload');
    }

    // Manage File Upload
    const file = req.files.image;
    const splitFile = file.name.split('.');
    const extensionFile = splitFile[splitFile.length - 1];
    const whiteListExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if (!whiteListExtension.includes(extensionFile)) {
      throw new BadRequest('Extension file is not valid');
    }
    const saveFile = `${uuidv4()}.${extensionFile}`;
    const pathTarget = `./src/uploads/${tipo}/${saveFile}`;

    //Move image into directory
    file.mv(pathTarget, (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: 'Error update image failure',
        });
      }
      // Update register in database
      updateImage(tipo, id, saveFile).then((resp) => {
        if (resp) {
          res.json({
            ok: true,
            msg: 'Archivo subido',
            saveFile,
          });
        } else {
          // Operation in database failure, drop file in directory
          deleteImage(pathTarget);
          res.json({
            ok: false,
            msg: 'Update file failure, please contact with support',
            saveFile,
          });
        }
      });
    });
  }

  getImage(req, res = response) {
    const tipo = req.params.tipo;
    const photo = req.params.photo;
    const image_default = '../uploads/no-image-found.png';
    let pathImage = path.join(__dirname, `../uploads/${tipo}/${photo}`);
    if (!fs.existsSync(pathImage)) {
      pathImage = path.join(__dirname, image_default);
    }
    res.sendFile(pathImage);
  }
}

module.exports = new UploadController();
