const { List, ListMovie, Movie, Genres } = require("../models/models");
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

  async deleteMovie(req, res, next) {
    try {
      const { listId, movieId } = req.body;
      const movie = await ListMovie.destroy({
        where: {
          listId,
          movieId,
        },
      });
      return res.json(movie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getMovies(req, res) {
    const { userId } = req.query;
    const moviesInList = await List.findAll({
      where: { userId },
      include: [
        {
          model: Movie,
          include: [Genres],
        },
      ],
    });
    return res.json(moviesInList);
  }
}

module.exports = new ListController();
