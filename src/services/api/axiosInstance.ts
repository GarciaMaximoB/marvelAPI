import axios, { AxiosError } from "axios";
const baseUrl = "http://gateway.marvel.com/v1/public";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  params: {
    ts: 1,
    apikey: process.env.NEXT_PUBLIC_API_KEY,
    hash: process.env.NEXT_PUBLIC_HASH,
    format: "comic",
    dateRange: "1939-01-01,2025-01-01",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message) {
      return Promise.reject({
        code: error.status,
        message: error.message,
      });
    }

    return Promise.reject({
      code: "9999",
      message: "Error desconocido",
    });
  }
);
