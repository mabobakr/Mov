const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type:String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 1,
    max: 20,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 20,
    required: true
  }
});

const Movie = mongoose.model('Movie', movieSchema);

function validate(movie)
{
  const schema = { 
    title: Joi.string().min(3).required(),
    genreid: Joi.objectId().required(),
    numberInStock: Joi.number().min(1).max(20).required(),
    dailyRentalRate: Joi.number().min(0).max(20).required()
  };
  return Joi.validate(movie, schema);
}

exports.validate = validate;
exports.Movie = Movie;
exports.movieSchema = movieSchema;