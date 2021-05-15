const { Schema, model } = require('mongoose');

const hospitalFields = {
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
};

// user.ref -> Show realtionship with <Users> collection

const HospitalSchema = Schema(hospitalFields, {
  collection: 'hospitals',
  timestamps: true,
});

// Modificar la salida del objeto respuesta Mongo
HospitalSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Hospital', HospitalSchema);
