import styles from "./Item.module.scss";

export function Item({ imageUrl, name }: { imageUrl: string; name: string }) {
  return <img src={imageUrl} alt={name} className={styles.itemElement} />;
}
