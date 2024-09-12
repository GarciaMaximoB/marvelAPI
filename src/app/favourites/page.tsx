import styles from "./index.module.scss"
import Card from "@/components/card"

export default function FavouritesPage(){
    return(
        <div className={styles.container}>
            <h1>MIS COMICS FAVORITOS</h1>
            <div className={styles.cardsWrapper}>
                <Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/>
            </div>
        </div>
    )
}