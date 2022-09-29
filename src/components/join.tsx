import styles from "./join.less";
import Card from "../components/join/card";

import contentImage from "../assets/storage.png";
import settingImage from "../assets/setting.png";
import relationshipImage from "../assets/relationship.png";
import collectionsImage from "../assets/collections.png";

export default function Join() {
  return (
    <div className={styles.join}>
      <div className={styles.joinTitle}>
        Join DB3 if you use sqlLite\mysql\Oracle to save
      </div>
      <div className={styles.joinSubtitle}>
        use DB3 in stead to make your web app more decentralized and more
        concerned about your privacy
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.joinList}>
          <Card
            image={contentImage}
            title="User Generated Content"
            content="privacy with data encryption is concern from the first day we were building the protocol"
          />
          <Card
            image={settingImage}
            title="User Personal Setting"
            content="privacy with data encryption is concern from the first day we were building the protocol"
          />
        </div>
        <div className={styles.joinList}>
          <Card
            image={relationshipImage}
            title="User Relationship"
            content="privacy with data encryption is concern from the first day we were building the protocol"
          />
          <Card
            image={collectionsImage}
            title="User’s collections/followers/likes…"
            content="privacy with data encryption is concern from the first day we were building the protocol"
          />
        </div>
      </div>
    </div>
  );
}
