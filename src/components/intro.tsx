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
        Database In WEB3 Should Be Like This
      </div>
      <div className={styles.introList}>
        <Card
          image={StorageImage}
          title="Permanet Storage"
          content="Allow users and developers store data forever, no need to worry about data lost."
        />
        <Card
          image={PrivacyImage}
          title="Build in Privacy"
          content="All content or database tables are encrypted by user’s own private key  and can be only accessed by owner or the one who gets authority from the owner"
        />
        {/* <Card
          image={DataImage}
          title="Data Analyze"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        /> */}
        <Card
          image={AqlImage}
          title="SQL Friendly"
          content="A classic-relational-database alike storage system but in decentralized way. Developer  is able to use db3  as easy as sqlite or mysql through our dedicate SDK."
        />
      </div>
    </div>
  );
}
