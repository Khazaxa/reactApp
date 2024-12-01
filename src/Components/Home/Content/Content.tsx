import styles from "./Content.module.scss";
import { GalleryPage } from "./GalleryPage/GalleryPage";

export function Content({
  setIsHomePage,
  setIsUsersPage,
  setIsGalleryPage,
  setIsFoldersPage,
  setIsPostsPage,
}): {
  setIsHomePage: (isHomePage: boolean) => void;
  setIsUsersPage: (isUsersPage: boolean) => void;
  setIsGalleryPage: (isGalleryPage: boolean) => void;
  setIsFoldersPage: (isFoldersPage: boolean) => void;
  setIsPostsPage: (isPostsPage: boolean) => void;
} {
  return (
    <div id={styles.content}>
      <GalleryPage />
    </div>
  );
}
