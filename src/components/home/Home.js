import useFetch from "../useFetch/useFetch";
import classes from "./Home.module.css";
import RecipeList from "../RecipeList/RecipeList";
import SearchBar from "../searchBar/SearchBar";
import { URL } from "../Url";
const Home = () => {
  const { data, isPending, error } = useFetch(URL);
  return (
    <div className={classes.home}>
      <SearchBar />
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {!isPending && data && !data.length && (
        <h2 className={classes.noData}>No Data Found... Please Add</h2>
      )}
    </div>
  );
};

export default Home;
