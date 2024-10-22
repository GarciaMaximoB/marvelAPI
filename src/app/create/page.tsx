import Formulario from "@/components/form";
import styles from "./index.module.scss";

export default function Create() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.createTitle}>¡Crea tu propio comic!</h1>
        <Formulario edit={false} />
      </div>
    </div>
  );
}
