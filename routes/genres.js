const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require("joi");
const debug = require('debug')('app:work')


// Creating Genre class
const Genre = mongoose.model('Genre', new mongoose.Schema({
  id: Number,
  name: {
    type:String,
    minlength: 3,
    required: true
  }
}));

// Returns all the genres 
router.get('/', async (req, res) => {
  const genres = await Genre.find()  
  
  if (!genres) return res.status(404).send('No Genres are found');

  res.send(genres);
  console.log(genres);
})

// Returns genre by ID
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)  
  
    if (!genre) return res.status(404).send("The genre was not found");
  
    res.send(genre);
    console.log(genre);
});


// Adds a new genre
router.post('/', async (req, res) => {
  const { error } = Validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let genre = new Genre({name: req.body.name });
  
  genre = await genre.save();
  
  res.send(genre);
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)  
  
  if (!genre) return res.status(404).send("The genre was not found");
  
  res.send(genre);
});


router.put('/:id', async (req, res) => {
  const { error } = Validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {new: true});    
  
  if (!genre) return res.status(404).send("The genre was not found");
  
  res.send(genre);
});


// Validation function
function Validation(genre) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(genre, schema);
}

module.exports = router;

