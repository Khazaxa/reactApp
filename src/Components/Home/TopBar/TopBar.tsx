import { AccountBtn } from "../../Button/AccountBtn/AccountBtn";
import { AddBtn } from "../../Button/AddBtn/AddBtn";
import RemoveBtn from "../../Button/RemoveBtn/RemoveBtn";
import { IsProps } from "../Home";
import styles from "./TopBar.module.scss";

export function TopBar({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: IsProps) {
  return (
    <div id={styles.topBar}>
      <RemoveBtn
        isHomePage={isHomePage}
        isUsersPage={isUsersPage}
        isGalleryPage={isGalleryPage}
        isFoldersPage={isFoldersPage}
        isPostsPage={isPostsPage}
      />
      <AddBtn
        isHomePage={isHomePage}
        isUsersPage={isUsersPage}
        isGalleryPage={isGalleryPage}
        isFoldersPage={isFoldersPage}
        isPostsPage={isPostsPage}
      />
      <AccountBtn />
    </div>
  );
}
