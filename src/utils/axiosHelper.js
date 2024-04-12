import axios from "axios";
let baseUrl = "";

if (process.env.REACT_APP_ENVIRONMENT === "local") {
  baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api`;
}

if (process.env.REACT_APP_ENVIRONMENT === "prod") {
  baseUrl = "/api";
}

export const axiosInstance = axios.create({
  baseURL: "https://dns-manager-be.vercel.app/api",
  withCredentials: true,
});
