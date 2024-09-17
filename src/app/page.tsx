import Link from "next/link";
import styles from "./index.module.scss";
import Search from "@/components/search";
import Card from "@/components/card";

import { StarOutlined, PlusOutlined } from "@ant-design/icons";
import Filters from "@/components/Filters";
export default function Home() {
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
          <Filters />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
