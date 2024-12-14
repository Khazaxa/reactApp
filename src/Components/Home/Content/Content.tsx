import styles from "./Content.module.scss";
import { FoldersPage } from "./FoldersPage/FoldersPage";
import { GalleryPage } from "./GalleryPage/GalleryPage";
import { HomePage } from "./HomePage/HomePage";
import { PostsPage } from "./PostsPage/PostsPage";
import { UsersPage } from "./UsersPage/UsersPage";
import { Routes, Route } from "react-router-dom";

const Content = () => {
  return (
    <div id={styles.content}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/folders" element={<FoldersPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </div>
  );
};

export default Content;
