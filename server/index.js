require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const {getMovies, addMovie, deleteMovie} = require("./controllers/movies.js"); 

const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("server running");
});

app.get("/movies", (req, res) => {
  if (req.query.title) {
    getMovies(req.query.title).then(data => res.status(200).json(data))
  } else {
    getMovies().then(data => res.status(200).json(data))
  }
});

app.post("/movies", (req, res) => {
  if (req.body) {
    addMovie(req.body).then(data => res.status(200).json(data))
  } else {
    res.status(400).json("invalid request");
  }
})

app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    deleteMovie(id).then(data => res.status(200).json({deleted: id}))
  } else {
    res.status(400).json("invalid request");
  }
})

app.listen(port, () =>
  console.log(`Back end server running on  http://localhost:${port}`)
);
