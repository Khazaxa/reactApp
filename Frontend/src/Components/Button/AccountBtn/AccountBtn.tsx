import styles from "./AccountBtn.module.scss";
import settings from "../../../assets/settings.png";
import { NavLink } from "react-router-dom";

export function AccountBtn() {
  return (
    <NavLink to="/settings">
      <button id={styles.account}>
        <img src={settings} alt="Settings Button" />
      </button>
    </NavLink>
  );
}
