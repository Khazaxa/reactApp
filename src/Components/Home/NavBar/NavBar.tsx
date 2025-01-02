import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.scss";
import NavLinks from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";
import { useState } from "react";

export function NavBar({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {

  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  return (
    <div id={(showNavBar ? styles.navBarHidden : styles.navBar )} >
      <button className={styles.navBarBtn} onClick={() => setShowNavBar(!showNavBar)}>
        {showNavBar ? 'X' : '☰'}
      </button>
      <div>
        <div id={styles.logo}>
          <img src={logo} alt="siteLogo" />
        </div>
      </div>
      <div className={styles.navBarContainer}>
        <NavLinks setShowNavBar={setShowNavBar}/>
        <LogOut setIsLogged={setIsLogged} />
      </div>
    </div>
  );
}

export default NavBar;
