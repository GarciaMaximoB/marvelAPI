"use client";
import { GlobalStateService } from "@/services/globalStateService";
import styles from "./index.module.scss";

import Card from "../card";
import { useEffect, useState } from "react";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import SkeletonCard from "../comicsSkeleton";

export default function Comics() {
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
}
