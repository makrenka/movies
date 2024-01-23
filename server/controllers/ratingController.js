const ApiError = require("../error/ApiError");
const { Rating } = require("../models/models");

class RatingController {
  async createRating(req, res, next) {
    try {
      const { rate, userId, movieId } = req.body;
      const rating = await Rating.create({ rate, userId, movieId });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getRating(req, res) {
    const { movieId } = req.query;
    const ratingMovie = await Rating.findAndCountAll({
      where: { movieId },
    });
    return res.json(ratingMovie);
  }
}

module.exports = new RatingController();
