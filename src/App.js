import { ThemeProvider } from "./components/ThemeContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
function App() {
  return (
    <ThemeProvider>
      <div>
        <BrowserRouter basename={"recipe-finder"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
