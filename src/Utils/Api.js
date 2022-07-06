import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const boot = () => client.get("/sanctum/csrf-cookie");

const loginUser = async () => {
  await boot();
  return client.post("/login", {
    email: "asep@mail.com",
    password: "asep12345",
  });
};

const loginAdmin = async () => {
  await boot();
  return client.post("/login", {
    email: "admin@mail.com",
    password: "admin12345",
  });
};

const registerUser = async () => {
  await boot();
  return client.post("/register");
};

const logout = () => client.post("/logout");

export { loginUser, loginAdmin, registerUser, logout };
