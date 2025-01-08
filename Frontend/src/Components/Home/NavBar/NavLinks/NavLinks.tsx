import styles from "./NavLinks.module.scss";
import { NavLink } from "react-router-dom";

export function NavLinks({
  setShowNavBar,
}: {
  setShowNavBar: (showNavBar: boolean) => void;
}) {

  const handleShowNavBar = () => {
    setShowNavBar(false);
  }

  return (
    <div id={styles.navLinks}>
      <ul>
        <NavLink to="/home" onClick={handleShowNavBar} className={styles.navLink}>
          <li className={styles.navItem}>Home</li>
        </NavLink>
        <NavLink to="/users" onClick={handleShowNavBar} className={styles.navLink}>
          <li className={styles.navItem}>Users</li>
        </NavLink>
        <NavLink to="/gallery" onClick={handleShowNavBar} className={styles.navLink}>
          <li className={styles.navItem}>Gallery</li>
        </NavLink>
        <NavLink to="/folders" onClick={handleShowNavBar} className={styles.navLink}>
          <li className={styles.navItem}>Folders</li>
        </NavLink>
        <NavLink to="/posts" onClick={handleShowNavBar} className={styles.navLink}>
          <li className={styles.navItem}>Posts</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavLinks;
