const { Schema, model } = require('mongoose');

const UserFields = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
  },
  google: {
    type: Boolean,
    default: false,
  },
  activated: {
    type: Boolean,
    default: false,
  }
};

const UserSchema = Schema(UserFields, { timestamps: true });

// Modificar la salida del objeto respuesta Mongo
UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Users', UserSchema);
