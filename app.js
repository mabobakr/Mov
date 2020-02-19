// Importing required modules
const Joi = require("joi");
const express = require('express');
const app = express();

// Allowing express to parse json files
app.use(express.json());

// Simple genres array
let genres = [
    {id: 1, name:"genre 1"},
    {id: 2, name:"genre 2"},
    {id: 3, name:"genre 3"},
];


// Starting listening on the port
let port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on port ${port}`)});

// Home route
app.get('/', (req, res) => {
    res.send("<h1> Welcome to Mov! </h1>");
})

// Returns all the genres 
app.get('/api/genres', (req, res) => {
    res.send(genres);
})

// Returns genre by ID
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre was not found");

    res.send(genre);
})

// Adds a new genre
app.post('/api/genres', (req, res) => {
    const {error} = Validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {id: genres.length + 1, name: req.body.name};
    genres.push(genre);
    res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre was not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
    let genre = genres.find(g => g.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre was not found");

    const {error} = Validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
})

// Validation function
function Validation(genre)
{
    const schema = {name: Joi.string().min(3).required()};
    return Joi.validate(genre, schema);
}