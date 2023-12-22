const { List } = require("../models/models");
const ApiError = require("../error/ApiError");

class ListController {
  async create(req, res) {
    const { movie } = req.body;
    const movieInList = await List.create({ movie });
    return res.json({ movieInList });
  }

  async getAll(req, res) {
    const moviesInList = await List.findAll();
    return res.json(moviesInList);
  }
}

module.exports = new ListController();
