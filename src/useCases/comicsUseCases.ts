import APIService from "../services/api/apiService";
import { ErrorService } from "../services/errorService";
import { GlobalStateService } from "../services/globalStateService";

const retrieveComics = async () => {
  try {
    const response = await APIService.getComics();
    GlobalStateService.setComicsData(response.data.results);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase); 
    GlobalStateService.removeComicsData();
  }
};

export const ComicsUseCases = {
  retrieveComics,
};
