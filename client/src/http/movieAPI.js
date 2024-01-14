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

export const addGenres = async (genres) => {
  const { data } = await $authHost.post("api/movie/genres", genres);
  return data;
};

export const fetchMovies = async (id, page, limit = 5) => {
  const { data } = await $host.get("api/movie", {
    params: {
      id,
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
