const express = require("express");
const pokemon = require("./models/pokemon");

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

app.post("/pokemon", (req, res) => {
  console.log(req.body);
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
});
