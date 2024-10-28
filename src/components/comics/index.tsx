import { GlobalStateService } from "@/services/globalStateService";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SkeletonCard from "../comicsSkeleton";
import Card from "../card";

interface ComicsProps {
  filter: string;
  order: string;
  character: string;
  query?: string;
}

const Comics: React.FC<ComicsProps> = ({ filter, order, character, query }) => {
  const [loading, setLoading] = useState(true);
  const comics = GlobalStateService.getComicsData();
  const currentPage = GlobalStateService.getCurrentPage();

  useEffect(() => {
    setLoading(true);
    ComicsUseCases.retrieveComics(query)
      .then(() => {
        ComicsUseCases.retrieveFavComics();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, query]);

  let filteredComics = comics.filter((comic) => {
    if (filter === "api") {
      return comic.source === "API";
    } else if (filter === "database") {
      return comic.source === "DATABASE";
    }
    return true;
  });

  if (character !== "none") {
    filteredComics = filteredComics.filter((comic) => {
      if (comic.characters.available > 0) {
        return comic.characters.items.some(
          (char) =>
            char.name.trim().toLowerCase() === character.trim().toLowerCase()
        );
      }
      return false;
    });
  }

  const sortedComics = [...filteredComics].sort((a, b) => {
    if (order === "az") {
      return a.title.localeCompare(b.title);
    } else if (order === "za") {
      return b.title.localeCompare(a.title);
    } else if (order === "page") {
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
