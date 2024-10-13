import { GlobalStateService } from "@/services/globalStateService";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SkeletonCard from "../comicsSkeleton";
import Card from "../card";

interface ComicsProps {
  filter: string;
  order: string;
}

const Comics: React.FC<ComicsProps> = ({ filter, order }) => {
  const [loading, setLoading] = useState(true);
  const comics = GlobalStateService.getComicsData() || [];

  useEffect(() => {
    ComicsUseCases.retrieveComics()
      .then(() => {
        ComicsUseCases.retrieveFavComics();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filtrado
  const filteredComics = comics.filter((comic) => {
    if (filter === "api") {
      return comic.source === "API";
    } else if (filter === "database") {
      return comic.source === "DATABASE";
    }
    return true;
  });

  // Ordenamiento
  const sortedComics = [...filteredComics].sort((a, b) => {
    if (order === "character") {
      return a.title.localeCompare(b.title);
    } else if (order === "api") {
      return b.title.localeCompare(a.title);
    } else if (order === "database") {
      return b.pageCount - a.pageCount;
    }
    return 0;
  });

  return (
    <div className={styles.cardsWrapper}>
      {loading
        ? Array(8)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        : Array.isArray(sortedComics) &&
          sortedComics.map((comic) => <Card key={comic.id} comic={comic} />)}
    </div>
  );
};

export default Comics;
