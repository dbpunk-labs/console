import styles from "./intro.less";
import Card from "../components/intro/card";

import StorageImage from "../assets/storage.png";
import PrivacyImage from "../assets/Privacy.png";
import DataImage from "../assets/data.png";
import AqlImage from "../assets/AQL.png";

export default function Intro() {
  return (
    <div className={styles.intro}>
      <div className={styles.introTitle}>
        The database in WEB3 should be like this
      </div>
      <div className={styles.introList}>
        <Card
          image={StorageImage}
          title="Permanet Storage"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        />
        <Card
          image={PrivacyImage}
          title="Build in Privacy"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        />
        <Card
          image={DataImage}
          title="Data Analyze"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        />
        <Card
          image={AqlImage}
          title="SQL Friendly"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        />
      </div>
    </div>
  );
}
