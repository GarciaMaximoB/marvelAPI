import styles from "./index.module.scss"
import Image from "next/image"

export default function Search(){
    return(
        <form className={styles.form}action="">
            <input type="text" placeholder="Encuentra tu comic favorito..." className={styles.input}/>
            <button type="submit" className={styles.button}>
                <Image src="/search.svg" alt="search icon" width={35} height={35}/>
            </button>
        </form>
    )
}