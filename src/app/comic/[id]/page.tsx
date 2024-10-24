"use client";
import { GlobalStateService } from "@/services/globalStateService";
import { useEffect, useState } from "react";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useSearchParams } from "next/navigation";

import styles from "./index.module.scss";
export default function ComicPage({ params }: { params: { id: number } }) {
  const [loading, setLoading] = useState(true);
  const comic = GlobalStateService.getComicData();

  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  useEffect(() => {
    const id = params.id;
    if (source == "API") {
      ComicsUseCases.retrieveComic({ id }).finally(() => {
        setLoading(false);
      });
    } else if (source == "DATABASE") {
      ComicsUseCases.retrieveUserComic({ id }).finally(() => {
        console.log(id)
        setLoading(false);
      });
    }
  }, [params.id, source]);
  if (loading) return <p>Cargando comic...</p>;
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${
          comic
            ? `${comic.thumbnail.path}${
                comic.thumbnail.extension ? `.${comic.thumbnail.extension}` : ""
              }`
            : "/logoMarvel.png"
        })`,
      }}
    >
      <div className={styles.comicContainer}>
        <img
          src={`${
            comic
              ? `${comic.thumbnail.path}${
                  comic.thumbnail.extension
                    ? `.${comic.thumbnail.extension}`
                    : ""
                }`
              : "/logoMarvel.png"
          }`}
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
