import styles from "./Home.module.scss";
import NavBar from "./NavBar/NavBar";
import Content from "./Content/Content";
import FilterBar from "./FilterBar/FilterBar";
import TopBar from "./TopBar/TopBar";

const Home = () => {
  return (
    <div id={styles.mainWindow}>
      <NavBar />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <Content />
      </div>
    </div>
  );
};

export default Home;
