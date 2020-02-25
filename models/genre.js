const mongoose = require('mongoose');
const Joi = require('joi');

// Creating Genre class
const genreSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength: 3,
    required: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

// Validation function
function Validation(genre) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = Validation;
exports.genreSchema = genreSchema;