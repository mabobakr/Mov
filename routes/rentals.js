const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  if (!rentals) return res.status(404).send("There's no retnals");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieid);
  if (!movie) return res.status(400).send("Invalid movie");

  const customer = await Customer.findById(req.body.customerid);
  if (!customer) return res.status(400).send("Invlid customer");

  let rental = new Rental({
    customer: customer,
    movie: movie,
  });

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);
});

module.exports = router;
