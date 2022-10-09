import styles from "./detail.less";
import detailImage from "../assets/intro.png";

export default function Detail() {
  return (
    <div className={styles.detail}>
      <div className={styles.detailTitle}>How Does DB3 Works</div>
      <div className={styles.detailContent}>
        <div className={styles.detailImage}>
          <div className={styles.detailImageWrapper}>
            <img src={detailImage} />
          </div>
        </div>
        <div className={styles.detailList}>
          <div className={styles.detailItem}>
            <div className={styles.itemTitle}>
              Main chain
            </div>
            <div className={styles.itemContent}>
              The main chain is the key role of maintain the safety of the whole system.
              Mainly responsible for database Miner and the user’s contract
              matching, transaction settlement and anti-cheating matters{" "}
            </div>
          </div>
          <div className={`${styles.detailItem}`}>
            <div className={styles.itemTitle}>Storage Chard Chain</div>
            <div className={styles.itemContent}>
              Each account will have a separate shard chain. 
              Shard chain is where database file actually stored and 
              responsible for the file permanent storage.{" "}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.itemTitle}>Database Virtual Machine</div>
            <div className={styles.itemContent}>
              Database Virtual Machine is where smart contract executed  
              and the contract defines how the app would use users data. 
              Every contract written by developers of dApps is open sourced to the public{" "}
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
