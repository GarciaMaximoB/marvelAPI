"use client";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IComic } from "@/types";

export default function Card({ comic }: { comic: IComic }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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

      {isFavorite ? (
        <StarFilled
          className={styles.comicFav}
          onClick={toggleFavorite}
          style={{ color: "#fcba03" }}
        />
      ) : (
        <StarOutlined className={styles.comicFav} onClick={toggleFavorite} />
      )}
    </div>
  );
}
