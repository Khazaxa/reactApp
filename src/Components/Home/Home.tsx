import styles from "./Home.module.scss";
import NavBar from "./NavBar/NavBar";
import FilterBar from "./FilterBar/FilterBar";
import TopBar from "./TopBar/TopBar";
import Content from "./Content/Content";

const Home = () => {
  return (
    <div id={styles.mainWindow}>
      <NavBar />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <div id={styles.innerContent}>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Home;
