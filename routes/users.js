const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send('There are no users currently');
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.send({
    name: user.username,
    email: user.email
  });
});

module.exports = router