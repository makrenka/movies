import { makeAutoObservable } from "mobx";

export default class MovieStore {
  constructor() {
    this._genres = [];

    this._movies = [];

    this._selectedGenre = {};

    makeAutoObservable(this);
  }

  setGenres(genres) {
    this._genres = genres;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  setSelectedGenre(genre) {
    this._selectedGenre = genre;
  }

  get genres() {
    return this._genres;
  }

  get movies() {
    return this._movies;
  }

  get selectedGenre() {
    return this._selectedGenre;
  }
}
