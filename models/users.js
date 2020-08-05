const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add your email']
  },
  favourites: {
    type: [],
    required: [true, 'Need businesses ID']
  }
});

module.exports = mongoose.model('User', UserSchema);