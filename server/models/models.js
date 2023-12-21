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

const Movie = sequelize.define("movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
  director: {
    type: DataTypes.STRING,
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

User.hasOne(List);
List.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

List.hasMany(ListMovie);
ListMovie.belongsTo(List);

Movie.hasOne(ListMovie);
ListMovie.belongsTo(Movie);

Genres.hasMany(Movie);
Movie.belongsTo(Genres);

Movie.hasMany(Rating);
Rating.belongsTo(Movie);

module.exports = {
  User,
  List,
  ListMovie,
  Movie,
  Genres,
  Rating,
};
