const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const config = require('config')

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send("There are no users currently");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exist = await User.findOne(_.pick(req.body, ["email"]));
  if (exist) return res.status(400).send("this email is already registered");

  let user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

module.exports = router;
