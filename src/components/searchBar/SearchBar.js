import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const [userSearch, setUserSearch] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (userSearch.trim()) navigate(`/search?q=${userSearch}`);
  };

  return (
    <div className={classes.searchbar}>
      <form onSubmit={searchHandler}>
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          name="search"
          placeholder="Search By Title"
          id="search"
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
