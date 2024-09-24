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

const getComic = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.get(`/comics/${id}`);
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const APIService = {
  getComics,
  getComic,
};

export default APIService;
