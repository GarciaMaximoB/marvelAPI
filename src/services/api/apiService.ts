import { axiosInstance } from "./axiosInstance";

const getComics = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get("/comics", {
      params: { page, pageSize },
    });
    const data = response.data;
    console.log(data);
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

const addToFavourites = async (comic: any) => {
  try {
    await axiosInstance.post("/favcomics", comic);
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const getCharacters = async () => {
  try {
    const { data } = await axiosInstance.get("/characters");
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const createComic = async (comic: any) => {
  try {
    await axiosInstance.post("/usercomics", comic);
  } catch (errorApi: any) {
    console.log({ errorApi });
    throw new Error(errorApi.message);
  }
};

const deleteUserComic = async (comic: any) => {
  try {
    await axiosInstance.delete(`/comics/${comic.id}`);
  } catch (errorApi: any) {
    console.log({ errorApi });
    throw new Error(errorApi.message);
  }
};

const APIService = {
  getComics,
  getComic,
  getFavComics,
  deleteFromFavourites,
  addToFavourites,
  getCharacters,
  createComic,
  deleteUserComic,
};

export default APIService;
