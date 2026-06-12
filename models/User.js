const bcrypt = require('bcrypt');
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

// HASH PASSWORDS
// this middleware is ran every time .create() or
// .save() are called
userSchema.pre("save", async function () {
  // prevent hashing again if password was not modified
  if (!this.isModified("password")) return;

  // Hash password if it is being modified
  // Or being defined afresh
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);