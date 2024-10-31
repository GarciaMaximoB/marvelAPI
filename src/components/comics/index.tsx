import { GlobalStateService } from "@/services/globalStateService";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SkeletonCard from "../comicsSkeleton";
import Card from "../card";

interface ComicsProps {
  order: string;
  characters: number;
  query: string;
  filter: string;
}

const Comics: React.FC<ComicsProps> = ({
  order,
  characters,
  query,
  filter,
}) => {
  const [loading, setLoading] = useState(true);
  const comics = GlobalStateService.getComicsData();
  const currentPage = GlobalStateService.getCurrentPage();

  useEffect(() => {
    setLoading(true);
    ComicsUseCases.retrieveComics({
      nameStartsWith: query,
      characters,
      order,
      source: filter,
    })
      .then(() => {
        ComicsUseCases.retrieveFavComics();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, query, order, characters, filter]);

  // let filteredComics = comics.filter((comic) => {
  //   if (filter === "api") {
  //     return comic.source === "API";
  //   } else if (filter === "database") {
  //     return comic.source === "DATABASE";
  //   }
  //   return true;
  // });

  // if (character !== "none") {
  //   filteredComics = filteredComics.filter((comic) => {
  //     if (comic.characters.available > 0) {
  //       return comic.characters.items.some(
  //         (char) =>
  //           char.name.trim().toLowerCase() === character.trim().toLowerCase()
  //       );
  //     }
  //     return false;
  //   });
  // }

  return (
    <div className={styles.cardsWrapper}>
      {loading
        ? Array(8)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        : Array.isArray(comics) &&
          comics.map((comic) => <Card key={comic.id} comic={comic} />)}
    </div>
  );
};

export default Comics;
