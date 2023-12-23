const uuid = require("uuid");
const path = require("path");
const { Movie } = require("../models/models");
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

  async getAll(req, res) {}

  async getOne(req, res) {}
}

module.exports = new MovieController();
