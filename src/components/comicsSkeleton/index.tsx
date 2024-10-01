import styles from "./index.module.scss";

export default function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonFav}></div>
    </div>
  );
}
