import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}
export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState();
  //set theme from local stroage if exists
  useEffect(() => {
    if (localStorage.getItem("theme") != null) {
      setDarkTheme(localStorage.getItem("theme") === "false" ? false : true);
    } else {
      localStorage.setItem("theme", "false");
      setDarkTheme(false);
    }
  }, []);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
