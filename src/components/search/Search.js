import { useLocation, Link } from "react-router-dom";
import classes from "./Search.module.css";
import { URL } from "../Url";
import useFetch from "../useFetch/useFetch";
import RecipeList from "../RecipeList/RecipeList";
import Button from "../button/Button";
const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  console.log(query);

  const { data, isPending, error } = useFetch(`${URL}?q=${query}`);

  return (
    <div className={classes.home}>
      <h2 className={classes.include}>
        Recipes incliding <em>{query}</em>
      </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {!isPending && data && !data.length && (
        <>
          <h2 className={classes.noData}>No Data Found... Please Add</h2>
          <Link to="/">
            <Button classes={classes.gotobtn}>Goto HomePage</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Search;
