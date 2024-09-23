import { create } from "zustand";
import { IComic } from "@/types";
interface IDataGlobalState {
  comics: IComic[];
}
const initialData: IDataGlobalState = {
  comics: [],
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
};
