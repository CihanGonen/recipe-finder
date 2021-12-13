import SearchRecipes from "../components/SearchRecipes";
import { useTheme, useThemeUpdate } from "../components/ThemeContext";
import SunLight from "../assets/sunLight.png";
import Moon from "../assets/moon.png";

export default function Home() {
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();
  const themeStyles = {
    backgroundColor: darkTheme ? "rgb(33, 35, 34)" : "ivory",
    color: darkTheme ? "rgb(215, 215, 215)" : "rgb(36, 36, 36)",
  };

  return (
    <div style={themeStyles} className="App">
      <div className="header-wrapper">
        <h1>Search Recipes and Find the Meal to feed your stomach</h1>

        <button onClick={toggleTheme}>
          {darkTheme ? (
            <img src={SunLight} alt="light-mode toggle" />
          ) : (
            <img src={Moon} alt="dark-mode togggle" />
          )}
        </button>
      </div>
      <SearchRecipes />
    </div>
  );
}
