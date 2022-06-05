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
app.use(express.json()); // parse the req into json
app.use(express.urlencoded({ extended: false })); // parse into javascript

//  ================= Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", async (req, res) => {

  try {
  // res.send(pokemon);

  //==============fetch data from the db
  const pokemons = await PokemonModel.find();
 
    res.render("Index", {
      pageTitle: "Pokemon",
      pageHeader: "See All The Pokemon!",
      data: pokemons,
    });
  } catch (error) {
    console.log(error);
  }
  })
;

app.get("/pokemon/new", (req, res) => {
  res.render("New", {
    pageTitle: "Create a new pokemon",
    pageHeader: "Create a new pokemon",
  });
});

app.post("/pokemon", async (req, res) => {
  const newPokemon = req.body; // create a newPokemon variable
  // add a img property to the object
  newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}`;

  console.log(newPokemon);

  // Save the new pokemon to the db
  await PokemonModel.create(newPokemon, (error, result) =>{if (error) {
    console.log(error);
  } 
  res.redirect('/pokemon')
  console.log(result);
});

});

app.get("/pokemon/:id", async (req, res) => {
  // res.send(req.params.id);
try {
  console.log(req.params.id);
  const  pokemon = await PokemonModel.findById(req.params.id)
  console.log('Pokemon found', pokemon);
  
  res.render("Show", {
    pageTitle: "Details",
    pageHeader: " Gotta catch 'Em All",
    data: pokemon,
  });
} catch (error) {
  console.log(error);
}
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
  mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected!');
});
