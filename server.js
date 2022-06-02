const express = require("express");
const pokemon = require("./models/pokemon");

// =============== Setup
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

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

app.get("/pokemon/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
});
