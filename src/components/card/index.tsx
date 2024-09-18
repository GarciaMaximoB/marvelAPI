"use client";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Card() {
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const id = 1;

  return (
    <div className={styles.mycard}>
      <div onClick={() => router.push(`/comic/${id}`)}>
        <img
          src="/spiderman-comic.jpg"
          alt="Tapa de comic de spiderman"
          className={styles.imagePortada}
        />
        <p className={styles.comicTitle}>
          SPIDER-MAN: HOMEROOM HEROES (2024) #1
        </p>
        <p className={styles.comicPages}>32 pages</p>
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
