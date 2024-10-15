"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import Search from "@/components/search";
import Comics from "@/components/comics";

import { StarOutlined, PlusOutlined } from "@ant-design/icons";
import Filters from "@/components/Filters";
import { useState } from "react";
import Paginacion from "@/components/paginacion";

export default function Home() {
  const [filter, setFilter] = useState("none");
  const [order, setOrder] = useState("none");
  const [character, setCharacter] = useState("none");

  return (
    <div className={styles.header}>
      <Search />
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Link href="/create" className={styles.createButton}>
            <PlusOutlined />
            CREAR COMIC
          </Link>
          <Link href="/favourites" className={styles.favButton}>
            <StarOutlined />
            FAVORITOS
          </Link>
        </div>
        <div className={styles.filters}>
          <Filters
            onFilterChange={(value) => setFilter(value)}
            onOrderChange={(value) => setOrder(value)}
            onCharacterChange={(value) => setCharacter(value)}
          />
        </div>
      </div>

      <Comics filter={filter} order={order} character={character} />
      <Paginacion />
    </div>
  );
}
