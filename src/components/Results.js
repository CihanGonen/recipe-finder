import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

import Pagination from "./Pagination";

import "./Results.css";

export default function Results({ searchParam }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const darkTheme = useTheme();
  const themeStyles = {
    backgroundColor: darkTheme ? "rgb(52, 55, 54)" : "mintcream",
    boxShadow: darkTheme
      ? "0px 0px 12px black, -0px -0px 12px rgb(52, 55, 54)"
      : "0px 0px 12px #aaa, -0px -0px 12px #fff",
  };

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      let code = "";
      searchParam[0] === "category"
        ? (code = "c")
        : searchParam[0] === "area"
        ? (code = "a")
        : (code = "i");
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?${code}=${searchParam[1]}`
        );
        const values = await res.json();
        setRecipes(values.meals);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipes();
  }, [searchParam]);

  return (
    <div style={themeStyles} className="showside-wrapper">
      {loading ? (
        <h2>loading...</h2>
      ) : recipes ? (
        <Pagination recipes={recipes} />
      ) : (
        <h2>No Recipe found for this search :(</h2>
      )}
    </div>
  );
}
