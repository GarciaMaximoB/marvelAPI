"use client";
import { GlobalStateService } from "@/services/globalStateService";
import { useEffect, useState } from "react";
import { ComicsUseCases } from "@/useCases/comicsUseCases";

import styles from "./index.module.scss";
export default function ComicPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const comic = GlobalStateService.getComicData();

  useEffect(() => {
    const id = params.id;
    ComicsUseCases.retrieveComic({ id }).finally(() => {
      setLoading(false);
    });
  }, [params.id]);
  if (loading) return <p>Cargando comic...</p>;
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`,
      }}
    >
      <div className={styles.comicContainer}>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className={styles.comicImage}
        />
        <div className={styles.comicInfo}>
          <h2 className={styles.comicTitle}>{comic.title}</h2>
          <p className={styles.comicDescription}>{comic.description}</p>
          <div className={styles.comicDetails}>
            <span>
              <p className={styles.comicDetailsTitle}>PUBLICADO:</p>
              <p>{comic.sale_date}</p>
            </span>
            <span>
              <p className={styles.comicDetailsTitle}>PÁGINAS:</p>
              <p>{comic.pageCount}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
