const mongoose = require('mongoose');

const user_profilesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const user_profiles = mongoose.model('user_profiles', user_profilesSchema);

module.exports = user_profiles;