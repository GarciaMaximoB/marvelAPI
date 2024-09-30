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
    ComicsUseCases.retrieveComics()
      .then(() => {
        ComicsUseCases.retrieveFavComics();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando comics...</p>;

  return (
    <div className={styles.cardsWrapper}>
      {Array.isArray(comics) &&
        comics.map((comic) => <Card key={comic.id} comic={comic} />)}
    </div>
  );
}
