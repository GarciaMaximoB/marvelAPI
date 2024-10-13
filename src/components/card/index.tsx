"use client";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { IComic } from "@/types";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useEffect, useState } from "react";
import { GlobalStateService } from "@/services/globalStateService";

export default function Card({ comic }: { comic: IComic }) {
  const favourites = GlobalStateService.getFavComicsData();

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (favourites.size > 0) {
      const favourite = favourites.has(comic.id);
      setIsFavourite(favourite);
    }
  }, [favourites]);

  const handleFav = async () => {
    await ComicsUseCases.toggleFavourite(comic);
  };

  const router = useRouter();
  if (!comic) return <div>No hay comics</div>;

  return (
    <div className={styles.mycard} key={comic.id}>
      <div onClick={() => router.push(`/comic/${comic.id}`)}>
        <img
          src={`${
            comic
              ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
              : "/logoMarvel.png"
          }`}
          alt={comic ? comic.title : ""}
          className={styles.imagePortada}
        />
        <p className={styles.comicTitle}>{comic.title}</p>
        <p className={styles.comicPages}>{comic.pageCount} páginas</p>
      </div>

      {isFavourite ? (
        <StarFilled
          className={styles.comicFav}
          style={{ color: "#fcba03" }}
          onClick={handleFav}
        />
      ) : (
        <StarOutlined className={styles.comicFav} onClick={handleFav} />
      )}
    </div>
  );
}
