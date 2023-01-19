import classes from "./RecipeList.module.css";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

const RecipeList = ({ recipes }) => {
  return (
    <div className={classes.recipeList}>
      {recipes.map((recipe) => (
        <Card key={recipe.id} classes={classes.listCard}>
          <h3 className={classes.title}>{recipe.title}</h3>
          <p className={classes.time}>{recipe.time} to make</p>
          <div className={classes.method}>
            {recipe.method.substring(0, 100)}...
          </div>
          <Link className={classes.btn} to={`/recipe/${recipe.id}`}>
            <Button>Cook This ?</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default RecipeList;
