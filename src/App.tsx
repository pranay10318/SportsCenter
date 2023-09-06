// src/App.tsx
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { PreferencesProvider } from "./context/preferences/context";

const App = () => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2`}>
      <PreferencesProvider>
        <RouterProvider router={router} />
      </PreferencesProvider>
    </div>
  );
};
export default App;
