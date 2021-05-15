const { Schema, model } = require('mongoose');

const medicoFields = {
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
  hospital: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
    },
  ],
};

const MedicoSchema = Schema(medicoFields, {
  collection: 'medicos',
  timestamp: true,
});

// Modificar la salida del objeto respuesta Mongo
MedicoSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Medico', MedicoSchema);
