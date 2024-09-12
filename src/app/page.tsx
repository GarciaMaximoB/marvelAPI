
import Link from "next/link";
import styles from "./index.module.scss"
import Search from "@/components/search";
import Card from "@/components/card";

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <Link href="/favourites">FAVORITOS</Link>
        <Search/>
        <div className={styles.cardsWrapper}>
          <Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/>
        </div>
      </header>
    </div>
  );
}
