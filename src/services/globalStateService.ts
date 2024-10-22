import { create } from "zustand";
import { ICharacter, IComic } from "@/types";

interface IDataGlobalState {
  comics: IComic[];
  favComics: Map<number, IComic>;
  comic: IComic;
  userComics: IComic[];
  characters: ICharacter[];
  currentPage: number;

  totalItems: number;
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
    characters: { available: 0, items: [] },
    pageCount: 0,
    thumbnail: { path: "", extension: "" },
    source: "",
  },
  characters: [],
  currentPage: 1,
  totalItems: 0,
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

  removeUserComic(comic: IComic) {
    globalDataState.setState((prev) => {
      const newUserComics = prev.userComics.filter(
        (userComic: IComic) => userComic.id !== comic.id
      );
      return {
        ...prev,
        userComics: newUserComics,
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

  getCharactersData() {
    return globalDataState((state) => state.characters);
  },

  getCharactersDataOutsideComponent() {
    return globalDataState.getState().characters;
  },

  setCharactersData(charactersData: ICharacter[]) {
    globalDataState.setState({
      characters: charactersData,
    });
  },

  removeCharactersData() {
    globalDataState.setState((prev) => ({
      ...prev,
      characters: [],
    }));
  },

  getCurrentPage() {
    return globalDataState((state) => state.currentPage);
  },
  getCurrentPageOutsideComponent() {
    return globalDataState.getState().currentPage;
  },
  setCurrentPage(page: number) {
    globalDataState.setState({ currentPage: page });
  },

  getTotalItems() {
    return globalDataState((state) => state.totalItems);
  },
  getTotalItemsOutsideComponent() {
    return globalDataState.getState().totalItems;
  },
  setTotalItems(totalItemsData: number) {
    globalDataState.setState({
      totalItems: totalItemsData,
    });
  },

  createComic(comic: IComic) {
    globalDataState.setState((prev) => ({
      ...prev,
      userComics: [...prev.userComics, comic],
    }));
  },
};
