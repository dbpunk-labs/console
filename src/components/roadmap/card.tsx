import styles from "./card.less";

export default function Card(props: any) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{props.title}</div>
      <div className={styles.cardSubTitle}>{props.subTitle}</div>
      <div className={styles.cardBody}>{props.children}</div>
    </div>
  );
}
