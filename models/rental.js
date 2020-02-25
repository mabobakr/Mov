const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { genreSchema } = require('./genre');


const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
      },
      phone: Number,
      isGold: Boolean
    }),
    requied: true
  },
  movie: {
    type: new mongoose.Schema({
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
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 20,
        required: true
      }
    })
  }
}));

function validate(rental)
{
  const schema = {
    customerid: Joi.objectId().required(),
    movieid: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

exports.validate = validate;
exports.Rental = Rental;