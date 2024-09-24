import axios from "axios";
const baseUrl = "http://localhost:3000/api";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
