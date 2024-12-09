import styles from "./Home.module.scss";
import { useState } from "react";

import { Content } from "./Content/Content";
import { FilterBar } from "./FilterBar/FilterBar";
import { NavBar } from "./NavBar/NavBar";
import { TopBar } from "./TopBar/TopBar";

export interface IsProps {
  isHomePage: boolean;
  isUsersPage: boolean;
  isGalleryPage: boolean;
  isFoldersPage: boolean;
  isPostsPage: boolean;
}

export interface SetProps {
  setIsHomePage: (isHomePage: boolean) => void;
  setIsUsersPage: (isUsersPage: boolean) => void;
  setIsGalleryPage: (isGalleryPage: boolean) => void;
  setIsFoldersPage: (isFoldersPage: boolean) => void;
  setIsPostsPage: (isPostsPage: boolean) => void;
}

export function Home({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isUsersPage, setIsUserPage] = useState(false);
  const [isGalleryPage, setIsGalleryPage] = useState(false);
  const [isFoldersPage, setIsFoldersPage] = useState(false);
  const [isPostsPage, setIsPostsPage] = useState(false);

  return (
    <div id={styles.mainWindow}>
      <NavBar
        setIsLogged={setIsLogged}
        setIsHomePage={setIsHomePage}
        setIsUsersPage={setIsUserPage}
        setIsGalleryPage={setIsGalleryPage}
        setIsFoldersPage={setIsFoldersPage}
        setIsPostsPage={setIsPostsPage}
      />
      <div id={styles.content}>
        <TopBar
          isHomePage={isHomePage}
          isUsersPage={isUsersPage}
          isGalleryPage={isGalleryPage}
          isFoldersPage={isFoldersPage}
          isPostsPage={isPostsPage}
        />
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
