import { makeAutoObservable } from "mobx";

export default class MovieStore {
  constructor() {
    this._genres = [];
    this._movies = [];
    this._selectedGenre = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 9;
    makeAutoObservable(this);
  }

  setGenres(genres) {
    this._genres = genres;
  }
  setMovies(movies) {
    this._movies = movies;
  }
  setSelectedGenre(genre) {
    this.setPage(1);
    this._selectedGenre = genre;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  setLimit(limit) {
    this._limit = limit;
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
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
