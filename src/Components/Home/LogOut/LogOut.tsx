import { useNavigate } from "react-router-dom";
import logOut from "../../../assets/logout.png";
import styles from "./LogOut.module.scss";

export function LogOut() {
  const navigate = useNavigate();
  return (
    <div
      id={styles.logOut}
      onClick={() => {
        navigate("/login");
      }}
    >
      <img src={logOut} alt="logOut" />
      Log Out
    </div>
  );
}
