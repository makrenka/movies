const uuid = require("uuid");
const path = require("path");
const { Movie, Genres, MovieGenre } = require("../models/models");
const ApiError = require("../error/ApiError");

class MovieController {
  async create(req, res, next) {
    try {
      const { title, director, year, genreId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const movie = await Movie.create({
        title,
        director,
        year,
        genreId,
        img: fileName,
      });

      return res.json(movie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { genreId, limit, page } = req.query;
    page = page || 1;
    limit = +limit || 9;
    let offset = page * limit - limit;
    let movies = await Movie.findAndCountAll({
      limit,
      offset,
      include: Genres,
    });
    genreId = movies.genres;
    console.log(movies.rows.map((movie) => movie.genres)[0]);
    if (!genreId) {
      movies = await Movie.findAndCountAll({ limit, offset, include: Genres });
    } else {
      movies = await Movie.findAndCountAll({
        where: { genreId },
        limit,
        offset,
        include: Genres,
      });
    }
    return res.json(movies);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id }, include: Genres });
    console.log(movie.genres.map((genres) => genres.id));
    return res.json(movie);
  }
}

module.exports = new MovieController();
