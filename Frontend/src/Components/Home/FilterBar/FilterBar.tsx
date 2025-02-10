import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./FilterBar.module.scss";
//import search from "../../../Assets/search.png";

const FilterBar = () => {
  const location = useLocation();
  const [placeholder, setPlaceholder] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("name");

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
      setSearchParams({ search: value, filter: filterOption });
    } else {
      setSearchParams({ filter: filterOption });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterOption(value);
    setSearchParams({ search: searchTerm, filter: value });
  };

  return (
    <div id={styles.filterBar}>
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
        <div id={styles.filterOptions}>
          <select
            value={filterOption}
            onChange={handleFilterChange}
            disabled={
              location.pathname === "/home" || location.pathname === "/settings"
            }
          >
            <option value="name">by name</option>
            <option value="user" disabled={location.pathname === "/users"}>
              by user
            </option>
            <option value="id">by id</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
