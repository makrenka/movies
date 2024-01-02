import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const createGenre = async (genre) => {
  const { data } = await $authHost.post("api/genres", genre);
  return data;
};

export const fetchGenres = async () => {
  const { data } = await $host.get("api/genres");
  return data;
};
