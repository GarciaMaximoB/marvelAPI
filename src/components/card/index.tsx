"use client";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Card({
  id,
  image,
  title,
  pages,
}: {
  id: number;
  image: { path: string; extension: string };
  title: string;
  pages: number;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.mycard} key={id}>
      <div onClick={() => router.push(`/comic/${id}`)}>
        <img
          src={`${image.path}.${image.extension}`}
          alt={title}
          className={styles.imagePortada}
        />
        <p className={styles.comicTitle}>{title}</p>
        <p className={styles.comicPages}>{pages} páginas</p>
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
