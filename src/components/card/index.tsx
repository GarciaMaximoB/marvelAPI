import styles from "./index.module.scss"

export default function Card(){
    return(
        <div className={styles.mycard}>
            <img src="/spiderman-comic.jpg" alt="Tapa de comic de spiderman" className={styles.imagePortada}/>
            <p className={styles.comicTitle}>SPIDER-MAN: HOMEROOM HEROES (2024) #1</p>
            <p className={styles.comicPages}>32 pages</p>
            <img src="/star.svg" alt="icono de estrella" className={styles.comicFav}/>
        </div>
    )
}