import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./FilterBar.module.scss";
import search from "../../../Assets/search.png";

const FilterBar = () => {
  const location = useLocation();
  const [placeholder, setPlaceholder] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (location.pathname === "/posts") {
      setPlaceholder("Search posts");
    } else if (location.pathname === "/gallery") {
      setPlaceholder("Search gallery");
    } else if (location.pathname === "/folders") {
      setPlaceholder("Search folders");
    } else if (location.pathname === "/users") {
      setPlaceholder("Search users");
    } else if (location.pathname === "/home") {
      setPlaceholder("");
    } else if (location.pathname === "/settings") {
      setPlaceholder("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/folders") {
      setSearchTerm(searchParams.get("search") || "");
    } else if (location.pathname === "/gallery") {
      setSearchTerm(searchParams.get("search") || "");
    } else if (location.pathname === "/posts") {
      setSearchTerm(searchParams.get("search") || "");
    } else if (location.pathname === "/users") {
      setSearchTerm(searchParams.get("search") || "");
    }
  }, [location.pathname, searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div id={styles.filterBar}>
      <h1>Explore</h1>
      <div id={styles.search}>
        <input
          disabled={
            location.pathname === "/home" || location.pathname === "/settings"
          }
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
        />
        <img src={search} id={styles.loupe} />
      </div>
    </div>
  );
};

export default FilterBar;
