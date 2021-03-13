const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
      type: String,
      required: true,
      minlength:2,
      maxlength:20
  },
  surname: {
      type: String,
      required: true,
      minlength:2,
      maxlength:30
  },
  gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
  },
  username: {
      type: String,
      required: true,
      minlength:5,
      maxlength:30
  },
  password: {
      type: String,
      required: true,
  },
});

module.exports = model('User', schema);