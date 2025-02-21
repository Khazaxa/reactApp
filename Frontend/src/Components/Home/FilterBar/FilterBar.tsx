import styles from "./FilterBar.module.scss";
import search from "../../../assets/search.png";
import homeStyles from "../Home.module.scss";

const FilterBar = () => {
  return (
    <div id={styles.filterBar}>
      <h1>Explore</h1>
      <div id={styles.search}>
        <button className={homeStyles.navButton}>Filters</button>
        <img src={search} id={styles.loupe} />
      </div>
    </div>
  );
};

export default FilterBar;
