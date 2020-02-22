const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const debug = require('debug')('app:work');

const Customer = mongoose.model('customer', mongoose.Schema({
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
}));

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  
  if (!customers) return res.status(404).send('No Customers found');
  
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const cust = await Customer.findById(req.params.id);

  if (!cust) return res.status(404).send('Customer not Found');

  res.send(cust);
});

router.post('/', async (req, res) => {
  const { error } = ValidateCust(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  
  customer = await customer.save();
  
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const cust = await Customer.findOneAndRemove(req.params.id);

  if (!cust) return res.status(404).send('There\'s no Such customer');

  res.send(cust);
});

router.put('/:id', async (req, res) => {
  const { error } = ValidateCust(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cust = await Customer.findOneAndUpdate(req.params.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, { new: true });

  if (!cust) return res.status(404).send('There\'s no Such customer');

  res.send(cust);
});

function ValidateCust(customer)
{
  const Schema = {
    name: Joi.string().min(3).max(30).required(),
    isGold: Joi.bool(),
    phone: Joi.number().required()
  };
  return Joi.validate(customer, Schema);
}

module.exports = router;