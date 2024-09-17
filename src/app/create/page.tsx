import Formulario from "@/components/form";
import styles from "./index.module.scss";

export default function Create() {
  return (
    <div className={styles.container}>
      <h1>Creando comic</h1>
      <Formulario edit={false} />
    </div>
  );
}
