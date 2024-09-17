"use client";
import styles from "./index.module.scss";

import Formulario from "@/components/form";

export default function Edit({ params }: { params: { id: string } }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Editando el comic {params.id}</h1>
        <Formulario edit />
      </div>
    </div>
  );
}
