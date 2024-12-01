import styles from "./Home.module.scss";
import { useState } from "react";

import { Content } from "./Content/Content";
import { FilterBar } from "./FilterBar/FilterBar";
import { NavBar } from "./NavBar/NavBar";
import { TopBar } from "./TopBar/TopBar";

export function Home() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isUsersPage, setIsUserPage] = useState(false);
  const [isGalleryPage, setIsGalleryPage] = useState(false);
  const [isFoldersPage, setIsFoldersPage] = useState(false);
  const [isPostsPage, setIsPostsPage] = useState(false);

  return (
    <div id={styles.mainWindow}>
      <NavBar />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <Content
          setIsHomePage={setIsHomePage}
          setIsUsersPage={setIsUserPage}
          setIsGalleryPage={setIsGalleryPage}
          settIsFoldersPage={setIsFoldersPage}
          setIsPostsPage={setIsPostsPage}
        />
        {[isHomePage, isUsersPage, isGalleryPage, isFoldersPage, isPostsPage]}
      </div>
    </div>
  );
}
