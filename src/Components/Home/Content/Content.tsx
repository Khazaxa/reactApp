import { IsProps } from "../Home";
import styles from "./Content.module.scss";
import { FoldersPage } from "./FoldersPage/FoldersPage";
import { GalleryPage } from "./GalleryPage/GalleryPage";
import { HomePage } from "./HomePage/HomePage";
import { PostsPage } from "./PostsPage/PostsPage";
import { UsersPage } from "./UsersPage/UsersPage";

export function Content({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: IsProps) {
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
