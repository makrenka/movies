const { Genres } = require("../models/models");

class GenresController {
  async create(req, res) {
    const { name } = req.body;
    const genre = await Genres.create({ name });
    return res.json({ genre });
  }

  async getAll(req, res) {
    const genres = await Genres.findAll();
    return res.json(genres);
  }
}

module.exports = new GenresController();
