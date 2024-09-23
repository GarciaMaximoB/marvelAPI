"use client";
import { GlobalStateService } from "@/services/globalStateService";
import styles from "./index.module.scss";

import Card from "../card";
import { useEffect, useState } from "react";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
export default function Comics() {
  const [loading, setLoading] = useState(true);
  const comics = GlobalStateService.getComicsData() || [];

  useEffect(() => {
    ComicsUseCases.retrieveComics().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando comics...</p>;

  return (
    <div className={styles.cardsWrapper}>
      {Array.isArray(comics) &&
        comics.map((comic) => (
          <Card
            key={comic.id}
            image={comic.thumbnail}
            title={comic.title}
            pages={comic.pageCount}
            id={comic.id}
          />
        ))}
    </div>
  );
}
