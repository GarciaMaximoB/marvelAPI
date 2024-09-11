import Image from "next/image";
import styles from "./index.module.scss"
import Search from "@/components/search";
import Card from "@/components/card";

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
        <Card/>
      </header>
    </div>
  );
}
