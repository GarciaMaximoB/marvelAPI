"use client";
import { GlobalStateService } from "@/services/globalStateService";
import styles from "./index.module.scss";

import Card from "../card";
import { useEffect, useState } from "react";
import { ComicsUseCases } from "@/useCases/comicsUseCases";

export default function FavComics() {
  const [loading, setLoading] = useState(true);
  const favComics = GlobalStateService.getFavComicsData() || new Map();

  useEffect(() => {
    ComicsUseCases.retrieveFavComics().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando comics...</p>;

  return (
    <div className={styles.cardsWrapper}>
      {Array.from(favComics.values()).map((comic) => (
        <Card key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
