import styles from "./AccountBtn.module.scss";
import settings from "../../../assets/settings.png";

export function AccountBtn() {
  return (
    <button id={styles.account}>
      <img src={settings} alt="Settings Button" />
    </button>
  );
}
