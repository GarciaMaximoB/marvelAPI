import { axiosInstance } from "./axiosInstance";
const getComics = async () => {
  try {
    const [comicsResponse, userComicsResponse] = await Promise.all([
      axiosInstance.get("/comics"),
      axiosInstance.get("/usercomics"),
    ]);

    const comicsData = comicsResponse.data;
    const userComicsData = userComicsResponse.data;

    // Combinar los resultados en un solo array
    const combinedData = [...userComicsData, ...comicsData];

    return combinedData;
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

const APIService = {
  getComics,
  getComic,
  getFavComics,
  deleteFromFavourites,
  addToFavourites,
  getCharacters,
};

export default APIService;
