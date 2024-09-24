import APIService from "../services/api/apiService";
import { ErrorService } from "../services/errorService";
import { GlobalStateService } from "../services/globalStateService";

const retrieveComics = async () => {
  try {
    const response = await APIService.getComics();
    GlobalStateService.setComicsData(response);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeComicsData();
  }
};

const retrieveComic = async ({ id }: { id: string }) => {
  try {
    const response = await APIService.getComic({ id });
    GlobalStateService.setComicData(response[0]);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeComicData();
  }
};

export const ComicsUseCases = {
  retrieveComics,
  retrieveComic,
};
