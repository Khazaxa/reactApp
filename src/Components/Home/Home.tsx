import { FilterBar } from "./FilterBar/FilterBar";
import styles from "./Home.module.scss";
import { NavBar } from "./NavBar/NavBar";
import { TopBar } from "./TopBar/TopBar";

export function Home() {
  return (
    <div id={styles.mainWindow}>
      <NavBar />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
      </div>
    </div>
  );
}
