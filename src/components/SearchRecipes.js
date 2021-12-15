import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

import Results from "./Results";
import "./SearchRecipes.css";

const searchByOptions = ["category", "main ingredient", "area"];
export default function SearchRecipes() {
  const [searchBy, setSearchBy] = useState(searchByOptions[0]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [mainIngredient, setMainIngredient] = useState("");
  const [searchParam, setSearchParam] = useState([]);

  const darkTheme = useTheme();
  const ThemeStyles = {
    backgroundColor: darkTheme ? "rgb(52, 55, 54)" : "mintcream",
    color: darkTheme ? "rgb(215, 215, 215)" : "rgb(36, 36, 36)",
    boxShadow: darkTheme
      ? "0px 0px 12px black, -0px -0px 12px rgb(52, 55, 54)"
      : "0px 0px 12px #aaa, -0px -0px 12px #fff",
  };

  const getCategories = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );

      const resCategories = await res.json();

      resCategories.meals.forEach((category) => {
        setCategories((prevCategories) => {
          return [...prevCategories, category.strCategory];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAreas = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );

      const resAreas = await res.json();
      resAreas.meals.forEach((area) => {
        setAreas((prevAreas) => {
          return [...prevAreas, area.strArea];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit", searchBy, selectedCategory);
    let searchWord =
      searchBy === "category"
        ? selectedCategory
        : searchBy === "area"
        ? selectedArea
        : mainIngredient.split(" ").join("_");
    setSearchParam([searchBy, searchWord]);
    localStorage.setItem("searchBy", searchBy);
    localStorage.setItem("searchWord", searchWord);
  };

  useEffect(() => {
    getCategories();
    getAreas();
    // if searched before and stored in local storage
    let searchByFromStorage = localStorage.getItem("searchBy");
    let searchWordFromStorage = localStorage.getItem("searchWord");
    if (searchByFromStorage && searchWordFromStorage) {
      setSearchBy(searchByFromStorage);
      searchByFromStorage === "category"
        ? setSelectedCategory(searchWordFromStorage)
        : searchByFromStorage === "area"
        ? setSelectedArea(searchWordFromStorage)
        : setMainIngredient(searchWordFromStorage);
    }
    setSearchParam([searchByFromStorage, searchWordFromStorage]);
  }, []);

  return (
    <div className="search-wrapper">
      <div style={ThemeStyles} className="searchside-wrapper">
        <form onSubmit={onFormSubmit}>
          <label htmlFor="searchBy">
            Search By
            <select
              id="searchBy"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              onBlur={(e) => setSearchBy(e.target.value)}
            >
              <option />
              {searchByOptions.map((searchByOption) => (
                <option key={searchByOption} value={searchByOption}>
                  {searchByOption}
                </option>
              ))}
            </select>
          </label>
          {searchBy === "category" ? (
            <label htmlFor="categories">
              Categories
              <select
                id="categories"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onBlur={(e) => setSelectedCategory(e.target.value)}
              >
                <option />
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          ) : searchBy === "area" ? (
            <label htmlFor="areas">
              Areas
              <select
                id="areas"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                onBlur={(e) => setSelectedArea(e.target.value)}
              >
                <option />
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label htmlFor="main-ingredient">
              Ingredient
              <input
                id="main-ingredient"
                onChange={(e) => setMainIngredient(e.target.value)}
                value={mainIngredient}
                placeholder="main ingredient"
              />
            </label>
          )}
          <button className="btn">Search</button>
        </form>
      </div>

      <Results searchParam={searchParam} />
    </div>
  );
}
