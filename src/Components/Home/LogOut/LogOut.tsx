import logOut from "../../../assets/logout.png";
import styles from "./LogOut.module.scss";

export function LogOut() {
  return (
    <div id={styles.logOut}>
      <img src={logOut} alt="logOut" />
      Log Out
    </div>
  );
}
