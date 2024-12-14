import styles from "./NavLinks.module.scss";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div id={styles.navLinks}>
      <ul>
        <NavLink to="/" className={styles.navLink}>
          <li className={styles.navItem}>Home</li>
        </NavLink>
        <NavLink to="/users" className={styles.navLink}>
          <li className={styles.navItem}>Users</li>
        </NavLink>
        <NavLink to="/gallery" className={styles.navLink}>
          <li className={styles.navItem}>Gallery</li>
        </NavLink>
        <NavLink to="/folders" className={styles.navLink}>
          <li className={styles.navItem}>Folders</li>
        </NavLink>
        <NavLink to="/posts" className={styles.navLink}>
          <li className={styles.navItem}>Posts</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavLinks;
