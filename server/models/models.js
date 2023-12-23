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
  movie: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const ListMovie = sequelize.define("list_movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Movie = sequelize.define("movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  rating: {
    type: DataTypes.STRING,
    defaultValue: 0,
  },
  genreId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
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
    type: DataTypes.INTEGER,
  },
});

const MovieGenre = sequelize.define("movie_genre", {
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

List.hasMany(ListMovie);
ListMovie.belongsTo(List);

Movie.hasOne(ListMovie);
ListMovie.belongsTo(Movie);

Movie.belongsToMany(Genres, { through: MovieGenre });
Genres.belongsToMany(Movie, { through: MovieGenre });

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
