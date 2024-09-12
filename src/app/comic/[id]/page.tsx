import styles from "./index.module.scss";
export default function ComicPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.background}>
      <div className={styles.comicContainer}>
        <img
          src="/spiderman-comic.jpg"
          alt="Comic de Spider-Man"
          className={styles.comicImage}
        />
        <div className={styles.comicInfo}>
          <h2 className={styles.comicTitle}>
            SPIDER-MAN: HOMEROOM HEROES (2024) #{params.id}
          </h2>
          <p className={styles.comicDescription}>
            MARVEL&apos;S NEW COMICS FOR YOUNG READERS CONTINUE! Old foes, new
            tricks! Teenage super hero Spider-Man has enough on his plate
            keeping New York City safe from the likes of Electro and Tombstone -
            but when you add in his life as high-schooler Peter Parker, things
            get REALLY stressful. Luckily, Spidey&apos;s got web-shooters,
            Spider-Sense, some super-friends, and a knack for creative
            problem-solving on his side! Featuring two ten-page short stories,
            this new series is the perfect introduction to the Marvel Universe
            and the wall-crawling world of Spider-Man!
          </p>
          <div className={styles.comicDetails}>
            <span>
              <p className={styles.comicDetailsTitle}>PUBLICADO:</p>
              <p>2024-11-27</p>
            </span>
            <span>
              <p className={styles.comicDetailsTitle}>PÁGINAS:</p>
              <p>32</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
