import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.scss";
import NavLinks from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";

const NavBar = () => {
  return (
    <div id={styles.navBar}>
      <div id={styles.logo}>
        <img src={logo} alt="siteLogo" />
      </div>
      <NavLinks />
      <LogOut />
    </div>
  );
};

export default NavBar;
