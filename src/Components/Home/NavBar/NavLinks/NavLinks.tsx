import { NavItem } from "./NavItem/NavItem";
import styles from "./NavLinks.module.scss";

export function NavLinks() {
  return (
    <div id={styles.navLinks}>
      <NavItem>Home</NavItem>
      <NavItem>Users</NavItem>
      <NavItem>Gallery</NavItem>
      <NavItem>Folders</NavItem>
      <NavItem>Posts</NavItem>
    </div>
  );
}
