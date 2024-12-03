import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.scss";

import { NavLinks } from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";

export function NavBar({
  setIsHomePage,
  setIsUsersPage,
  setIsGalleryPage,
  setIsFoldersPage,
  setIsPostsPage,
}: {
  setIsHomePage: (isHomePage: boolean) => void;
  setIsUsersPage: (isUsersPage: boolean) => void;
  setIsGalleryPage: (isGalleryPage: boolean) => void;
  setIsFoldersPage: (isFoldersPage: boolean) => void;
  setIsPostsPage: (isPostsPage: boolean) => void;
}) {
  return (
    <div id={styles.navBar}>
      <div id={styles.logo}>
        <img src={logo} alt="siteLogo" />
      </div>
      <NavLinks
        setIsHomePage={setIsHomePage}
        setIsUsersPage={setIsUsersPage}
        setIsGalleryPage={setIsGalleryPage}
        setIsFoldersPage={setIsFoldersPage}
        setIsPostsPage={setIsPostsPage}
      />
      <LogOut />
    </div>
  );
}
