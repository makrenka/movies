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
      const movieGenre = await MovieGenre.create({ movieId, genreId });
      return res.json(movieGenre);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async addGenres(req, res, next) {
  //   const { movieId, genreId } = req.body;
  //   try {
  //     const movie = await Movie.findByPk(movieId).then((movie) => {
  //       if (!movie) {
  //         console.log("Movie not found");
  //         return null;
  //       }
  //       return Genres.findByPk(genreId).then((genre) => {
  //         if (!genre) {
  //           console.log("Genre not found");
  //           return null;
  //         }

  //         movie.addGenres(genre);
  //         console.log(`>> added Genre id=${genre.id} to Movie id=${movie.id}`);
  //         return movie;
  //       });
  //     });

  //     return res.json(movie);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

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
