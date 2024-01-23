import { $host } from ".";

export const addRating = async (rating) => {
  const { data } = await $host.post("api/rating", rating);
  return data;
};

export const fetchRating = async (movieId) => {
  const { data } = await $host.get("api/rating", {
    params: { movieId },
  });
  return data;
};
