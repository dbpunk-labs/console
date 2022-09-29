import styles from "./detail.less";
import detailImage from "../assets/detail.png";

export default function Detail() {
  return (
    <div className={styles.detail}>
      <div className={styles.detailTitle}>How does DB3 network works</div>
      <div className={styles.detailContent}>
        <div className={styles.detailImage}>
          <div className={styles.detailImageWrapper}>
            <img src={detailImage} />
          </div>
        </div>
        <div className={styles.detailList}>
          <div className={styles.detailItem}>
            <div className={styles.itemTitle}>
              Storage Shard chain enables network fast and scalable
            </div>
            <div className={styles.itemContent}>
              Some text Some text Some text Some textSome text Some textSome
              text Some textSome text Some text{" "}
            </div>
          </div>
          <div className={`${styles.detailItem} ${styles.detailItemActivited}`}>
            <div className={styles.itemTitle}>Dedicated Compute Chain</div>
            <div className={styles.itemContent}>
              Some text Some text Some text Some textSome text Some textSome
              text Some textSome text Some text{" "}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.itemTitle}>Globally Sync Data</div>
            <div className={styles.itemContent}>
              Some text Some text Some text Some textSome text Some textSome
              text Some textSome text Some text{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.action}>
          <div className={styles.actionButton}>Read More</div>
      </div>
    </div>
  );
}
