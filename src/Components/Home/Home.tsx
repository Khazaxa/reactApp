import { Routes, Route } from "react-router-dom";
import styles from "./Home.module.scss";
import { FilterBar } from "./FilterBar/FilterBar";
import { NavBar } from "./NavBar/NavBar";
import { TopBar } from "./TopBar/TopBar";
import { HomePage } from "./Content/HomePage/HomePage";
import { UsersPage } from "./Content/UsersPage/UsersPage";
import { GalleryPage } from "./Content/GalleryPage/GalleryPage";
import { FoldersPage } from "./Content/FoldersPage/FoldersPage";
import { PostsPage } from "./Content/PostsPage/PostsPage";

export function Home({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {
  return (
    <div id={styles.mainWindow}>
      <NavBar setIsLogged={setIsLogged} />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/folders" element={<FoldersPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </div>
    </div>
  );
}
