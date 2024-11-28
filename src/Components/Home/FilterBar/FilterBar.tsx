import styles from "./FilterBar.module.scss";
import search from "../../../Assets/search.png";
import homeStyles from "../Home.module.scss";

export function FilterBar() {
  return (
    <div id={styles.filterBar}>
      <h1>
        <strong>Explore</strong>
      </h1>
      <div id={styles.search}>
        <button className={homeStyles.navButton}> Filters </button>
        <img src={search} id={styles.loupe} />
      </div>
    </div>
  );
}
