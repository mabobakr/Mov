const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne(_.pick(req.body, ["email"]));

  if (!user) return res.status(400).send("Invalid email or password");

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(30).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
