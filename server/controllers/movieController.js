const uuid = require("uuid");
const path = require("path");
const { Movie, Genres } = require("../models/models");
const ApiError = require("../error/ApiError");

class MovieController {
  async create(req, res, next) {
    try {
      const { title, director, year, id } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const movie = await Movie.create({
        title,
        director,
        year,
        genres: [{ id }],
        img: fileName,
      });

      return res.json(movie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // create/update with Many to Many association in Node.js sequelize and PostgreSQL

  // industries: [
  //   { value: 'Gaming', label: 'Gaming' },
  //   { value: 'Computer Science', label: 'Computer Science' }
  //  ]

  //  const company = await Company.create({
  //     company_name: companyName,
  //  });

  //  const industry = await Industry.findAll({
  //     where: { industry_name: { [Op.in]: _.map(industries, o => o.label) } }
  //  });
  //  await company.addIndustry(industry);

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
