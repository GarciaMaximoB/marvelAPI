import { IComic } from "@/types";
import APIService from "../services/api/apiService";
import { ErrorService } from "../services/errorService";
import { GlobalStateService } from "../services/globalStateService";

const retrieveComics = async () => {
  const page = GlobalStateService.getCurrentPageOutsideComponent();
  const pageSize = 16;
  try {
    const response = await APIService.getComics({ page, pageSize });
    GlobalStateService.setComicsData(response.data);
    GlobalStateService.setTotalItems(response.total);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeComicsData();
  }
};

const retrieveComic = async ({ id }: { id: number }) => {
  try {
    const response = await APIService.getComic({ id });
    GlobalStateService.setComicData(response[0]);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeComicData();
  }
};

const retrieveFavComics = async () => {
  try {
    const response = await APIService.getFavComics();
    const map = new Map(
      response.map((res: any) => {
        return [res.id, res];
      })
    );
    GlobalStateService.setFavComicsData(map);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeFavComicsData();
  }
};

const IsInFavourites = (id: number): boolean => {
  const favourites = GlobalStateService.getFavComicsData();
  console.log(favourites);
  if (favourites.size >= 1) {
    return favourites.has(id);
  }
  return false;
};

const toggleFavourite = async (comic: IComic) => {
  const favourites = GlobalStateService.getFavComicsDataOutsideComponent();
  if (favourites.has(comic.id)) {
    GlobalStateService.removeComicFromFavourites(comic);
    await APIService.deleteFromFavourites(comic.id);
  } else {
    GlobalStateService.addToFavourites(comic);
    await APIService.addToFavourites(comic);
  }
};

const createComic = async (comic: IComic) => {
  try {
    await APIService.createComic(comic);
    GlobalStateService.createComic(comic);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
  }
};

export const ComicsUseCases = {
  retrieveComics,
  retrieveComic,
  retrieveFavComics,
  IsInFavourites,
  toggleFavourite,
  createComic,
};
