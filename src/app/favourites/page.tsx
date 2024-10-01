import styles from "./index.module.scss";
import FavComics from "@/components/favComics";

export default function FavouritesPage() {
  return (
    <div className={styles.container}>
      <h1>LISTA DE COMICS FAVORITOS</h1>
      <FavComics />
    </div>
  );
}
