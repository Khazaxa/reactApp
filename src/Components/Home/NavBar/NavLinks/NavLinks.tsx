import { useNavigate } from "react-router-dom";
import { NavItem } from "./NavItem/NavItem";
import styles from "./NavLinks.module.scss";

export function NavLinks() {
  const navigate = useNavigate();

  return (
    <div id={styles.navLinks}>
      <NavItem
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </NavItem>
      <NavItem
        onClick={() => {
          navigate("/users");
        }}
      >
        Users
      </NavItem>
      <NavItem
        onClick={() => {
          navigate("/gallery");
        }}
      >
        Gallery
      </NavItem>
      <NavItem
        onClick={() => {
          navigate("/folders");
        }}
      >
        Folders
      </NavItem>
      <NavItem
        onClick={() => {
          navigate("/posts");
        }}
      >
        Posts
      </NavItem>
    </div>
  );
}
