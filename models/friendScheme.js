const { Schema, model } = require('mongoose');

const schema = new Schema({
  user1: {
    type: String,
    required: false,
  },
  user2: {
    type: String,
    required: true,
  },
  date_create: {
    type: String,
    required: true,
  },
});

module.exports = model('Friend', schema);