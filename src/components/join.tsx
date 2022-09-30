import styles from "./join.less";
import Card from "../components/join/card";

import relationshipImage from "../assets/relationship.png";
import loveImage from "../assets/love.png";
import locationImage from "../assets/location.png";

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
            image={relationshipImage}
            title="User Relationship"
            content="privacy with data encryption is concern from the first day we were building the protocol"
          />
          <Card
            image={loveImage}
            title="User’s Health Info"
            content="Like daily sleep time which is collected by all kinds of IoT"
          />
          <Card
            image={locationImage}
            title="User’s Location Info"
            content="It’ very sensitive if you are developing a decentralized Google Map or Uber to fight against monopoly."
          />
        </div>
      </div>
    </div>
  );
}
