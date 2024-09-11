import Image from "next/image";
import styles from "./index.modules.scss"
import Search from "@/components/search";

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <Image
          src='/logoMarvel.png'
          alt="Marvel Logo"
          width={165}
          height={66.19}
        />
        <Search/>
      </header>
    </div>
  );
}
