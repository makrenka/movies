const { List, ListMovie, Movie } = require("../models/models");
const ApiError = require("../error/ApiError");

class ListController {
  async addMovie(req, res, next) {
    try {
      const { listId, movieId } = req.body;
      const listMovie = await ListMovie.create({ listId, movieId });
      return res.json(listMovie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getMovies(req, res) {
    const { userId } = req.query;
    const moviesInList = await List.findAll({
      where: { userId },
      include: [Movie],
    });
    return res.json(moviesInList);
  }
}

module.exports = new ListController();
