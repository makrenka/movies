const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
});

const List = sequelize.define("list", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const ListMovie = sequelize.define("list_movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Movie = sequelize.define("movies", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
  },
  summary: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

const Genres = sequelize.define("genres", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.FLOAT,
  },
});

const MovieGenre = sequelize.define("movie_genres", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasOne(List);
List.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Movie.belongsToMany(List, { through: ListMovie });
List.belongsToMany(Movie, { through: ListMovie });

Movie.belongsToMany(Genres, {
  through: MovieGenre,
});
Genres.belongsToMany(Movie, {
  through: MovieGenre,
});

Movie.hasMany(Rating);
Rating.belongsTo(Movie);

module.exports = {
  User,
  List,
  ListMovie,
  Movie,
  Genres,
  Rating,
  MovieGenre,
};
