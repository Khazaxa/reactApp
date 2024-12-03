import styles from "./Content.module.scss";
import { FoldersPage } from "./FoldersPage/FoldersPage";
import { GalleryPage } from "./GalleryPage/GalleryPage";
import { HomePage } from "./HomePage/HomePage";
import { PostsPage } from "./PostsPage/PostsPage";
import { UsersPage } from "./UsersPage/UsersPage";

interface ContentProps {
  isHomePage: boolean;
  isUsersPage: boolean;
  isGalleryPage: boolean;
  isFoldersPage: boolean;
  isPostsPage: boolean;
}

export function Content({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: ContentProps) {
  return (
    <div id={styles.content}>
      {isHomePage && <HomePage />}
      {isUsersPage && <UsersPage />}
      {isGalleryPage && <GalleryPage />}
      {isFoldersPage && <FoldersPage />}
      {isPostsPage && <PostsPage />}
    </div>
  );
}
