const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  isGold: { type: Boolean, default: false},
  phone: {
    type: Number,
    required: true
  }
});

const Customer = mongoose.model('customer', customerSchema);

function ValidateCust(customer)
{
  const Schema = {
    name: Joi.string().min(3).max(30).required(),
    isGold: Joi.bool(),
    phone: Joi.number().required()
  };
  return Joi.validate(customer, Schema);
}

exports.Customer = Customer;
exports.validate = ValidateCust;
exports.customerSchema = customerSchema;