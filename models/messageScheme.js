const { Schema, model } = require('mongoose');

const schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  userTo: {
    type: String,
    required: true,
  },
  userFrom: {
    type: String,
    required: true,
  },
});

module.exports = model('Message', schema);