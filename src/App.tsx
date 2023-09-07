// src/App.tsx
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

const App = () => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2`}>
        <RouterProvider router={router} />
    </div>
  );
};
export default App;
