import { $authHost, $host } from ".";

export const createGenre = async (genre) => {
  const { data } = await $authHost.post("api/genres", genre);
  return data;
};

export const fetchGenres = async () => {
  const { data } = await $host.get("api/genres");
  return data;
};

export const createMovie = async (movie) => {
  const { data } = await $authHost.post("api/movie", movie);
  return data;
};

export const fetchMovies = async (genreId, page, limit = 5) => {
  const { data } = await $host.get("api/movie", {
    params: {
      genreId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneMovie = async (id) => {
  const { data } = await $host.get("api/movie/" + id);
  return data;
};
