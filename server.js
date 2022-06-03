const express = require("express");
const pokemon = require("./models/pokemon");
require('dotenv').config() //configuration for DOTENV
const mongoose = require('mongoose');
const PokemonModel = require('./models/PokemonModel')

// =============== Setup
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

// =================middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  ================= Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", (req, res) => {
  // res.send(pokemon);
  res.render("Index", {
    data: pokemon,
    pageTitle: "Pokemon",
    pageHeader: "See All The Pokemon!",
  });
});

app.get("/pokemon/new", (req, res) => {
  res.render("New", {
    pageTitle: "Create a new pokemon",
    pageHeader: "Create a new pokemon",
  });
});

app.post("/pokemon", async (req, res) => {
  const newPokemon = req.body // create a newPokemon variable
  // add a img property to the object
  newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name}`
  console.log(newPokemon);

  // Save the new pokemon to the db
  await PokemonModel.create(newPokemon, (error, result) =>{if (error) {
    console.log(error);
  } 
  console.log(result);
});

});

app.get("/pokemon/:id", (req, res) => {
  // res.send(req.params.id);

  res.render("Show", {
    pageTitle: "Details",
    pageHeader: " Gotta catch 'Em All",
    pokemon: pokemon[req.params.id],
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
  mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected!');
});
