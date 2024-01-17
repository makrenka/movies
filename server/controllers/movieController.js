const uuid = require("uuid");
const path = require("path");
const { Movie, Genres, MovieGenre } = require("../models/models");
const ApiError = require("../error/ApiError");

class MovieController {
  async createMovie(req, res, next) {
    try {
      const { id, title, director, year, summary } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const movie = await Movie.create({
        id,
        title,
        director,
        year,
        img: fileName,
        summary,
      });

      return res.json(movie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addGenres(req, res, next) {
    try {
      const { movieId, genreId } = req.body;
      const movieGenre = await MovieGenre.create({
        movieId,
        genreId,
      });
      return res.json(movieGenre);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { id, limit, page } = req.query;
    page = page || 1;
    limit = +limit || 9;
    let offset = page * limit - limit;
    let movies;
    if (!id) {
      movies = await Movie.findAndCountAll({
        limit,
        offset,
        include: [Genres],
        distinct: true,
      });
    } else {
      movies = await Movie.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Genres,
            where: { id },
          },
        ],
        distinct: true,
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
