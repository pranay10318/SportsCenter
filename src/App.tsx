// src/App.tsx
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";

const App = () => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2`}>
      <PreferencesProvider>
        <ArticlesProvider>
          <RouterProvider router={router} />
        </ArticlesProvider>
      </PreferencesProvider>
    </div>
  );
};
export default App;
