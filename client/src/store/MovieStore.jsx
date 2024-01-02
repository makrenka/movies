import { makeAutoObservable } from "mobx";

export default class MovieStore {
  constructor() {
    this._genres = [];

    this._movies = [
      {
        id: 1,
        title: "Gladiator",
        director: "Ridley Scott",
        img: "b18c72be-331e-42eb-b341-8c38bdff3537.jpg",
        year: "2000",
        rating: 0,
        genreId: 2,
      },
      {
        id: 2,
        title: "The Terminator",
        director: "James Cameron",
        img: "788e2f2c-e8da-4e3c-9516-a73b17a4bd2b.jpg",
        year: "1984",
        rating: 0,
        genreId: 3,
      },
      {
        id: 3,
        title: "Braveheart",
        director: "Mel Gibson",
        img: "d9017ba6-e282-4571-9349-a279d2c7cc7f.jpg",
        year: "1995",
        rating: 0,
        genreId: 4,
      },
      {
        id: 4,
        title: "The Fifth Element",
        director: "Luc Besson",
        img: "a68489e8-63ac-4b6d-9731-1308fc16b404.jpg",
        year: "1995",
        rating: 0,
        genreId: 3,
      },
      {
        id: 5,
        title: "Troy",
        director: "Wolfgang Petersen",
        img: "ba6b625b-4bda-4dbc-bd1c-ec2e909538f7.jpg",
        year: "2004",
        rating: 0,
        genreId: 2,
      },
    ];

    this._selectedGenre = {};

    makeAutoObservable(this);
  }

  setGenres(genres) {
    this._genres = genres;
  }

  setUser(movies) {
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
