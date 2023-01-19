import classes from "./Recipe.module.css";
import Button from "../button/Button";
import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch/useFetch";
import Card from "../Card/Card";
import { URL } from "../Url";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isPending, error } = useFetch(`${URL}/${id}`);
  // Req for Delete
  const {
    methodOptionHandler,
    isPending: delisPending,
    error: delError
  } = useFetch(`${URL}/${id}`, "DELETE");
  const deleteHandler = () => {
    methodOptionHandler();
  };

  return (
    <Card classes={classes.recipe}>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {delError && <p className="error">{delError}</p>}
      {recipe && (
        <div key={recipe.id} className={classes.flx}>
          <h2 className={classes.title}>{recipe.title}</h2>
          <p className={classes.time}>{recipe.time} to make</p>
          <h3 className={classes.h3}>Ingredient List :</h3>
          <ul className={classes.ingredientList}>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}, </li>
            ))}
          </ul>
          <div className={classes.method}>{recipe.method}</div>
          <Link className={classes.btn} to={`/recipe/${recipe.id}`}>
            <Button
              disabled={delisPending ? true : false}
              onClick={deleteHandler}
            >
              {delisPending ? "Deleting" : "Delete"}
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default Recipe;
