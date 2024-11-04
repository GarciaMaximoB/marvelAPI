import { GlobalStateService } from "@/services/globalStateService";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SkeletonCard from "../comicsSkeleton";
import Card from "../card";

interface ComicsProps {}

const Comics: React.FC<ComicsProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const comics = GlobalStateService.getComicsData();
  const currentPage = GlobalStateService.getCurrentPage();

  const order = GlobalStateService.getOrder();

  const characters = GlobalStateService.getCharacters();
  const query = GlobalStateService.getQuery();
  const filter = GlobalStateService.getFilter();

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
