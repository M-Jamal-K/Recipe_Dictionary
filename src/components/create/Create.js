import { useState, useRef } from "react";
import classes from "./Create.module.css";
import Card from "../Card/Card";
import Button from "../button/Button";
import useFetch from "../useFetch/useFetch";
import { URL } from "../Url";

const Create = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientFocus = useRef(null);

  const { methodOptionHandler, isPending, error } = useFetch(URL, "POST");

  const Reset = () => {
    setTitle("");
    setTime("");
    setMethod("");
    setNewIngredients("");
    setIngredients([]);
  };

  const addIngredientsHandler = () => {
    const ing = newIngredients.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIng) => [...prevIng, ing]);
      setNewIngredients("");
      ingredientFocus.current.focus();
    } else {
      alert("Empty value OR duplicate ingredient detected!!!");
      ingredientFocus.current.focus();
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !method.trim() || !ingredients.length) {
      alert(
        "Please fill all the inputs | Atleast one ingredient must be added"
      );
    } else {
      methodOptionHandler({
        title,
        ingredients,
        method,
        time: `${time} minutes`
      });
      Reset();
    }
  };
  return (
    <>
      <Card classes={classes.create}>
        <h2>Add New Recipe</h2>
        <form onSubmit={formSubmitHandler}>
          <label className={classes.label}>
            <span className={classes.span}>Recipe Title: </span>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
            />
          </label>
          {/* Ingredients */}
          <label className={classes.IngredientsLabel}>
            <span className={classes.span}>Recipe Ingredients :</span>
            <input
              type="text"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
              ref={ingredientFocus}
            />
            <div className={classes.ingredientsList}>
              Ingredient List :{" "}
              {ingredients &&
                ingredients.map((ingredient) => (
                  <em key={ingredient}>{ingredient}</em>
                ))}
            </div>
            <Button onClick={addIngredientsHandler} classes={classes.addbtn}>
              Add Ingredients
            </Button>
          </label>
          {/* Ingredients */}
          <label className={classes.label}>
            <span className={classes.span}>Recipe Method : </span>
            <textarea
              onChange={(e) => {
                setMethod(e.target.value);
              }}
              value={method}
              required
            />
          </label>
          <label className={classes.label}>
            <span className={classes.span}>Cooking Time : </span>
            <input
              type="number"
              onChange={(e) => {
                setTime(Math.abs(e.target.value));
              }}
              value={time}
              required
            />
          </label>
          <Button
            disabled={isPending ? true : false}
            classes={classes.btn}
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="error">{error}</p>}
        </form>
      </Card>
    </>
  );
};

export default Create;
