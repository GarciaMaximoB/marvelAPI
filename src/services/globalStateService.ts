import { create } from "zustand";
import { IComic } from "@/types";

interface IDataGlobalState {
  comics: IComic[];
  favComics: Map<number, IComic>;
  comic: IComic;
  userComics: IComic[];
}
const initialData: IDataGlobalState = {
  comics: [],
  userComics: [],
  favComics: new Map([]),
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

  getUserComicsData() {
    return globalDataState((state) => state.userComics);
  },
  setComicsUserData(userComicsData: IComic[]) {
    globalDataState.setState({
      userComics: userComicsData,
    });
  },
  removeUserComicsData() {
    globalDataState.setState((prev) => ({
      ...prev,
      userComics: [],
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
    return globalDataState((state) => state.favComics);
  },
  setFavComicsData(favComicsData: Map<number, IComic>) {
    globalDataState.setState({
      favComics: favComicsData,
    });
  },
  removeFavComicsData() {
    globalDataState.setState((prev) => ({
      ...prev,
      favComics: new Map(),
    }));
  },

  removeComicFromFavourites(comic: IComic) {
    globalDataState.setState((prev) => {
      const newFavComics = new Map(prev.favComics);
      newFavComics.delete(comic.id);
      return {
        ...prev,
        favComics: newFavComics,
      };
    });
  },

  addToFavourites(comic: IComic) {
    globalDataState.setState((prev) => ({
      ...prev,
      favComics: new Map(prev.favComics).set(comic.id, comic),
    }));
  },

  getFavComicsDataOutsideComponent() {
    return globalDataState.getState().favComics;
  },
};
