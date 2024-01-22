import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const token = localStorage.getItem("token");
  if (jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.removeItem("token");
  }
  const { data } = await $authHost.get("api/user/auth");
  return jwtDecode(data.token);
};

export const fetchUsers = async () => {
  const { data } = await $host.get("api/user");
  return data;
};
