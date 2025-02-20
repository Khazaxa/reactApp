import styles from "./Content.module.scss";
import { FoldersPage } from "./FoldersPage/FoldersPage";
import { GalleryPage } from "./GalleryPage/GalleryPage";
import { HomePage } from "./HomePage/HomePage";
import { PostsPage } from "./PostsPage/PostsPage";
import { UsersPage } from "./UsersPage/UsersPage";
import { UserSettingsPage } from "./UserSettingsPage/UserSettingsPage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const Content = ({ isNavBarActive }: { isNavBarActive: boolean }) => {
  const location = useLocation();
  const addFolderFormView = location.state?.addFolderFormView || false;
  const addPostFormView = location.state?.addPostFormView || false;
  const showUserEditForm = location.state?.showUserEditForm || false;
  const showNavBar = location.state?.showNavBar || false;

  return (
    <div id={styles.content}>
      <div
        className={
          addFolderFormView ||
          addPostFormView ||
          showUserEditForm ||
          showNavBar ||
          isNavBarActive
            ? styles.blackBackground
            : styles.hiddenBlackBackground
        }
      ></div>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/folders" element={<FoldersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Routes>
      </>
    </div>
  );
};

export default Content;
