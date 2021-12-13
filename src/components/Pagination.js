import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function Pagination({ recipes }) {
  const [totalPage, setTotalPage] = useState(1);
  const [pageNums, setPageNums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const darkTheme = useTheme();
  const ThemeStyles = {
    backgroundColor: darkTheme ? "rgb(52, 55, 54)" : "mintcream",
    color: darkTheme ? "rgb(215, 215, 215)" : "rgb(36, 36, 36)",
  };

  console.log(currentPage);
  useEffect(() => {
    setPageNums([]);
    if (recipes.length > 9) {
      let pages = Math.ceil(recipes.length / 9);
      setTotalPage(pages);
      let totalRecipes = recipes.length;
      for (let i = 0; i < pages; i++) {
        if (totalRecipes / 9 >= 1) {
          setPageNums((prevPageNums) => {
            return [...prevPageNums, 9];
          });
          totalRecipes -= 9;
        } else {
          setPageNums((prevPageNums) => {
            return [...prevPageNums, totalRecipes];
          });
        }
      }
    } else {
      setPageNums([recipes.length]);
    }
  }, [recipes]);

  return (
    <div className="recipes-wrapper">
      {recipes
        .slice(
          8 * (currentPage - 1),
          8 * (currentPage - 1) + pageNums[currentPage - 1]
        )
        .map((recipe) => (
          <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`}>
            <div className="recipe-card">
              <div className="img-wrapper">
                <img
                  width="295px"
                  height="295px"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
              </div>
              <p style={ThemeStyles}>
                {recipe.strMeal.length > 25
                  ? recipe.strMeal.substring(0, 25) + "..."
                  : recipe.strMeal}
              </p>
            </div>
          </Link>
        ))}
      <div style={ThemeStyles} className="pagination-part">
        <button
          disabled={currentPage <= 1}
          onClick={() =>
            setCurrentPage((prevCurrentPage) => {
              return (prevCurrentPage -= 1);
            })
          }
        >
          <i style={ThemeStyles} className="fas fa-chevron-left fa-lg"></i>
        </button>
        <p>
          ( {currentPage} / {totalPage} )
        </p>
        <button
          disabled={currentPage >= totalPage}
          onClick={() =>
            setCurrentPage((prevCurrentPage) => {
              return (prevCurrentPage += 1);
            })
          }
        >
          <i style={ThemeStyles} className="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
    </div>
  );
}
