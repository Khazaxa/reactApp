import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";

export function AddBtn() {
  return (
    <button id={styles.add}>
      <img src={plus} alt="Add Button" />
    </button>
  );
}
