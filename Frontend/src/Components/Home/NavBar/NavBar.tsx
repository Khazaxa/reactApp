import logo from "../../../assets/logo.png";
import navArrow from "../../../assets/navArrow.png";
import styles from "./NavBar.module.scss";
import NavLinks from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";
import { useState } from "react";

export function NavBar({
  setIsLogged,
  setIsNavBarActive,
}: {
  setIsLogged: (isLogged: boolean) => void;
  setIsNavBarActive: (isActive: boolean) => void;
}) {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  if (!showNavBar) {
    setIsNavBarActive(showNavBar);
  }

  return (
    <div id={showNavBar ? styles.navBarHidden : styles.navBar}>
      <button
        className={styles.navBarBtn}
        onClick={() => {
          setShowNavBar(!showNavBar);
          setIsNavBarActive(!showNavBar);
        }}
      >
        <img src={navArrow} />
      </button>
      <div>
        <div id={styles.logo}>
          <img src={logo} alt="siteLogo" />
        </div>
      </div>
      <div className={styles.navBarContainer}>
        <NavLinks setShowNavBar={setShowNavBar} />
        <LogOut setIsLogged={setIsLogged} />
      </div>
    </div>
  );
}

export default NavBar;
