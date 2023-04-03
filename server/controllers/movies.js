const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

const getMovies = async (title) => {
  console.log(title);
  if (title) {
    
    return await knex("movies").where("title", "ilike", `%${title}%`);
  } else {
    return await knex("movies").select("*");
  }
};

const addMovie = async (title) => {
  return await knex("movies").insert(title);
}

const deleteMovie = async (id) => {
  return await knex("movies").where("id", id).del();
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie
};
