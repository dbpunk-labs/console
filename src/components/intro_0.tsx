import styles from "./intro_0.less";
import Card from "./intro/card";

import StorageImage from "../assets/storage.png";
import PrivacyImage from "../assets/Privacy.png";
import DataImage from "../assets/data.png";
import AqlImage from "../assets/AQL.png";
import BitcoinImage from "../assets/bitcoin.png";
import CrystallImage from "../assets/crystall.png";
import BlockImage from "../assets/blockchain.png";

export default function Intro_0() {
  return (
    <div className={styles.intro}>
      <div className={styles.introTitle}>
        What is ture data sovereignty in WEB3
      </div>
      <div className={styles.introList}>
        <Card
          image={BitcoinImage}
          title="User Data Ownership"
          content="Users are fully in control of their own data and can decide how their personal data is shared and accessed"
        />
        <Card
          image={CrystallImage}
          title="Transperent"
          content="DApps has an obligation to keep users data safe and use users data in a transparent way. DVM (Database virtual machine)  is where smart contract executed  and the contract defines how the app would use users data"
        />
        {/* <Card
          image={DataImage}
          title="Data Analyze"
          content="privacy with data encryption is concern from the first day we were building the protocol"
        /> */}
        <Card
          image={BlockImage}
          title="Decentralized"
          content="The network should be unstoppable and no authority can shut down or delete users' personal data. User data on the network should be censorship resistant and ant-tamper."
        />
      </div>
    </div>
  );
}
