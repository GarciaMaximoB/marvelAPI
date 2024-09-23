import { axiosInstance } from "./axiosInstance";

const getComics = async () => {
  try {
    const {data}  = await axiosInstance.get("/comics");
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const APIService = {
  getComics,
};

export default APIService;
