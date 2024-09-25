import { create } from "zustand";
import { IComic } from "@/types";
interface IDataGlobalState {
  comics: IComic[];
  favComics: IComic[];
  comic: IComic;
}
const initialData: IDataGlobalState = {
  comics: [],
  favComics: [],
  comic: {
    id: 0,
    title: "",
    description: "",
    sale_date: "",
    characters: [],
    pageCount: 0,
    thumbnail: { path: "", extension: "" },
    source: "",
  },
};
const globalDataState = create(() => initialData);
export const GlobalStateService = {
  getComicsData() {
    return globalDataState((state) => state.comics);
  },
  setComicsData(comicsData: IComic[]) {
    globalDataState.setState({
      comics: comicsData,
    });
  },
  removeComicsData() {
    globalDataState.setState((prev) => ({
      ...prev,
      comics: [],
    }));
  },

  //UN COMIC
  getComicData() {
    return globalDataState((state) => state.comic);
  },
  setComicData(comicData: IComic) {
    globalDataState.setState({
      comic: comicData,
    });
  },
  removeComicData() {
    globalDataState.setState((prev) => ({
      ...prev,
      comic: {
        id: 0,
        title: "",
        description: "",
        sale_date: "",
        characters: [],
        pageCount: 0,
        thumbnail: { path: "", extension: "" },
        source: "",
      },
    }));
  },

  //FAVOURITE COMICS
  getFavComicsData() {
    // return globalDataState((state) => state.favComics);
    return globalDataState.getState().favComics
  },
  setFavComicsData(favComicsData: IComic[]) {
    globalDataState.setState({
      favComics: favComicsData,
    });
  },
  removeFavComicsData() {
    globalDataState.setState((prev) => ({
      ...prev,
      comics: [],
    }));
  },
};
