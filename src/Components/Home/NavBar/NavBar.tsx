import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.scss";

import { NavLinks } from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";

export function NavBar({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {
  return (
    <div id={styles.navBar}>
      <div id={styles.logo}>
        <img src={logo} alt="siteLogo" />
      </div>
      <NavLinks />
      <LogOut setIsLogged={setIsLogged} />
    </div>
  );
}
