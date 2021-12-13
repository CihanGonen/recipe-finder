import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeContext";

import "./RecipePage.css";

export default function RecipePage() {
  const { id } = useParams();
  const [recipeInfos, setRecipeInfos] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const darkTheme = useTheme();
  const ThemeStyles = {
    backgroundColor: darkTheme ? "rgb(52, 55, 54)" : "mintcream",
    color: darkTheme ? "rgb(215, 215, 215)" : "rgb(36, 36, 36)",
    boxShadow: darkTheme
      ? "0px 0px 12px black, -0px -0px 12px rgb(52, 55, 54)"
      : "0px 0px 12px #aaa, -0px -0px 12px #fff",
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        console.log(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const recipe = await res.json();
        console.log(recipe.meals);
        setRecipeInfos(recipe.meals[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    const getDetails = () => {
      if (recipeInfos) {
        let i = 1;
        const ingredientsArr = [];
        // getting ingredients from the object
        while (recipeInfos[`strIngredient${i}`]) {
          ingredientsArr.push(recipeInfos[`strIngredient${i}`]);
          i += 1;
        }
        setIngredients(ingredientsArr);

        let j = 1;
        const measuramentsArr = [];
        // getting measuraments from the object
        while (recipeInfos[`strMeasure${j}`]) {
          measuramentsArr.push(recipeInfos[`strMeasure${j}`]);
          j += 1;
        }
        setMeasurements(measuramentsArr);
      }
    };
    getDetails();
  }, [recipeInfos]);

  return (
    <div
      style={{ backgroundColor: darkTheme ? "rgb(33, 35, 34)" : "ivory" }}
      className="recipe-detail-wrapper"
    >
      {recipeInfos ? (
        <div style={ThemeStyles} className="recipe-details">
          <div className="thumb">
            <div className="headings">
              <h2>{recipeInfos.strMeal}</h2>
              <p>{recipeInfos.strArea}</p>
            </div>{" "}
            <div className="image-wrapper">
              <img src={recipeInfos.strMealThumb} alt={recipeInfos.strMeal} />
            </div>
          </div>

          <div className="ingredients">
            <h3>Ingredients :</h3>
            <ul>
              {ingredients &&
                ingredients.map((ing, i) => (
                  <li key={ing}>
                    {ing} - {measurements[i]}
                  </li>
                ))}
            </ul>
          </div>

          <div className="instructions">
            <h3>İnstructions :</h3>
            <p>{recipeInfos.strInstructions}</p>
          </div>
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </div>
  );
}
