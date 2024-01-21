import { $host } from ".";

export const addMovie = async (movie) => {
  const { data } = await $host.post("api/list", movie);
  return data;
};

export const deleteMovie = async (movie) => {
  const { data } = await $host.post("api/list", movie);
  return data;
};

export const fetchList = async (userId) => {
  const { data } = await $host.get("api/list", {
    params: { userId },
  });
  return data;
};
