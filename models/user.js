const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  }
});

const User = mongoose.model("user", userSchema);

function validate(user)
{
  const schema = {
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(30).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;