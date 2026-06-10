const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
    select: false
  },
  bio: {
    type: String,
    maxLength: 500,
    trim: true,
    default: ""
  },
  avatar: {
    type: String,
    default: null,
    trim: true,
    match: [/^https?:\/\/.+/, "Avatar must be valid URL"]
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);