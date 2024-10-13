import APIService from "@/services/api/apiService";
import { ErrorService } from "@/services/errorService";
import { GlobalStateService } from "@/services/globalStateService";

const retrieveCharacters = async () => {
  try {
    const response = await APIService.getCharacters();
    console.log(response);
    GlobalStateService.setCharactersData(response);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeComicsData();
  }
};

export const CharacterUseCases = {
  retrieveCharacters,
};
