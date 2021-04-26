const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const customers = await Customer.find();

  if (!customers) return res.status(404).send("No Customers found");

  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const cust = await Customer.findById(req.params.id);

  if (!cust) return res.status(404).send("Customer not Found");

  res.send(cust);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  customer = await customer.save();

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const cust = await Customer.findOneAndRemove(req.params.id);

  if (!cust) return res.status(404).send("There's no Such customer");

  res.send(cust);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cust = await Customer.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!cust) return res.status(404).send("There's no Such customer");

  res.send(cust);
});

module.exports = router;
