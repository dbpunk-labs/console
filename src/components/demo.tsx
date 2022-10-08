import styles from "./demo.less";
import CodeImage from "../assets/code.png";

export default function Demo() {
  return (
    <div className={styles.demo}>
      <div className={styles.demoTitle}>
        Empower Apps to Be Fully Decentralized
      </div>
      <div className={styles.codeWrapper}>
        <img src={CodeImage} />
      </div>
      <div className={styles.demoList}>
        <div className={styles.demoItem}>Demo</div>
        <div className={styles.demoItem}>Demo</div>
        <div className={styles.demoItem}>Demo</div>
      </div>
    </div>
  );
}
