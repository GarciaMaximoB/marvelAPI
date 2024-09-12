import "../scss/_base.scss"
import { Roboto_Condensed } from 'next/font/google';
import styles from "./index.module.scss"
import Link from "next/link";
import Image from "next/image";

const robotoCondensed = Roboto_Condensed({
  subsets:['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <div className={styles.contenedor}>
        <Link
          href="/"
        >
        <Image
          src='/logoMarvel.png'
          alt="Marvel Logo"
          width={165}
          height={66.19}
        />
        </Link>
          {children}
        </div>
        
      </body>
    </html>
  );
}
