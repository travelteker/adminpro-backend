/*
    getSearch
*/

const { response } = require('express');
//const { BadRequest } = require('../helpers/error');

const user = require('../models/user');
const medico = require('../models/medico');
const hospital = require('../models/hospital');

class SearchController {
  async getSearch(req, res = response) {
    const search = req.params.value;
    // Using flag <i> means insensitve
    const regexp_search = new RegExp(search, 'i');
    const [users, medicos, hospitals] = await Promise.all([
      user.find({ name: regexp_search }),
      medico.find({ name: regexp_search }),
      hospital.find({ name: regexp_search }),
    ]);
    res.json({
      ok: true,
      msg: 'getSearch',
      users,
      medicos,
      hospitals,
    });
  }

  // TODO --> Optimize method <getDocumentosColeccion> because <mapping_collections> is doing 3 query to database and it is consuming a lot of time
  // TODO --> Better independent endpoints to get specific data for each collection

  async getDocumentosColeccion(req, res = response) {
    const tabla = req.params.tabla;
    const search = req.params.value;
    const regexp_search = new RegExp(search, 'i'); // Using flag <i> means insensitve
    const mapping_collections = {
      users: await user.find({ name: regexp_search }),
      medicos: await medico
        .find({ name: regexp_search })
        .populate('user', 'name image')
        .populate('hospital', 'name img'),
      hospitals: await hospital
        .find({ name: regexp_search })
        .populate('user', 'name image'),
    };

    let ok = '';
    let data = [];
    try {
      data = mapping_collections[tabla];
      ok = true;
    } catch (err) {
      ok = false;
      data = { message: `Collection <${tabla}> not found` };
    }

    res.json({
      ok,
      data,
    });
  }

  static async getUsers(regexp_search) {
    return await user.find({ name: regexp_search });
  }

  static async getMedicos(regexp_search) {
    return await medico
      .find({ name: regexp_search })
      .populate('user', 'name image');
  }

  static async getHospitals(regexp_search) {
    return await hospital
      .find({ name: regexp_search })
      .populate('user', 'name, image');
  }
}

module.exports = new SearchController();
