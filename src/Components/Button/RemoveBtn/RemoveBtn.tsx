import styles from "./RemoveBtn.module.scss";
import remove from "../../../assets/del.png";

export default function RemoveBtn() {
  return (
    <button id={styles.remove}>
      <img src={remove} alt="Remove Button" />
    </button>
  );
}
