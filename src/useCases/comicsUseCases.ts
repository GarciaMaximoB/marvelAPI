import { IComic } from "@/types";
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

const retrieveFavComics = async () => {
  try {
    const response = await APIService.getFavComics();
    GlobalStateService.setFavComicsData(response);
  } catch (errorUseCase: any) {
    console.log({ errorUseCase });
    ErrorService.handleError(errorUseCase);
    GlobalStateService.removeFavComicsData();
  }
};

// const addFavComic = (comic: any) => {
//   try {
//     const currentFavComics = GlobalStateService.getFavComicsData();

//     const isAlreadyFav = currentFavComics.some(
//       (favComic: any) => favComic.id === comic.id
//     );

//     let updatedFavComics;

//     if (isAlreadyFav) {
//       updatedFavComics = currentFavComics.filter(
//         (favComic: any) => favComic.id !== comic.id
//       );
//     } else {
//       updatedFavComics = [...currentFavComics, comic];
//     }

//     GlobalStateService.setFavComicsData(updatedFavComics);
//   } catch (errorUseCase: any) {
//     console.log({ errorUseCase });
//     ErrorService.handleError(errorUseCase);
//   }
// };

export const ComicsUseCases = {
  retrieveComics,
  retrieveComic,
  retrieveFavComics,
};
