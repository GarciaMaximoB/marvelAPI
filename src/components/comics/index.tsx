// ./src/components/comics/index.tsx
import { GlobalStateService } from "@/services/globalStateService";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SkeletonCard from "../comicsSkeleton";
import Card from "../card";

interface ComicsProps {
  filter: string;
}

const Comics: React.FC<ComicsProps> = ({ filter }) => {
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

  const filteredComics = comics.filter((comic) => {
    if (filter === "api") {
      return comic.source === "API";
    } else if (filter === "database") {
      return comic.source === "DATABASE";
    }
    return true;
  });

  return (
    <div className={styles.cardsWrapper}>
      {loading
        ? Array(8)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        : Array.isArray(filteredComics) &&
          filteredComics.map((comic) => <Card key={comic.id} comic={comic} />)}
    </div>
  );
};

export default Comics;
