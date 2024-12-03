import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.scss";

import { NavLinks } from "./NavLinks/NavLinks";
import { LogOut } from "../LogOut/LogOut";
import { SetProps } from "../Home";

export function NavBar({
  setIsLogged,
  setIsHomePage,
  setIsUsersPage,
  setIsGalleryPage,
  setIsFoldersPage,
  setIsPostsPage,
}: SetProps & { setIsLogged: (isLogged: boolean) => void }): JSX.Element {
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
      <LogOut setIsLogged={setIsLogged} />
    </div>
  );
}
