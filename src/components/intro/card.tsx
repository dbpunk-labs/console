import styles from "./card.less";

export default function Card(props: any) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={props.image} />
      </div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>{props.content}</div>
    </div>
  );
}
