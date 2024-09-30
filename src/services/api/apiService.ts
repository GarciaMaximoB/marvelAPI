import { axiosInstance } from "./axiosInstance";

const getComics = async () => {
  try {
    const { data } = await axiosInstance.get("/comics");
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const getComic = async ({ id }: { id: number }) => {
  try {
    const { data } = await axiosInstance.get(`/comics/${id}`);
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const getFavComics = async () => {
  try {
    const { data } = await axiosInstance.get("/favcomics");
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const deleteFromFavourites = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/favcomics/${id}`);
    return res;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const toggleFavourite = async (request: any) => {
  try {
    await axiosInstance.post("/favcomics", request);
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const APIService = {
  getComics,
  getComic,
  getFavComics,
  deleteFromFavourites,
};

export default APIService;
