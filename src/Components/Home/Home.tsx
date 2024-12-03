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
      <NavBar
        setIsHomePage={setIsHomePage}
        setIsUsersPage={setIsUserPage}
        setIsGalleryPage={setIsGalleryPage}
        setIsFoldersPage={setIsFoldersPage}
        setIsPostsPage={setIsPostsPage}
      />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <Content
          isHomePage={isHomePage}
          isUsersPage={isUsersPage}
          isGalleryPage={isGalleryPage}
          isFoldersPage={isFoldersPage}
          isPostsPage={isPostsPage}
        />
      </div>
    </div>
  );
}
