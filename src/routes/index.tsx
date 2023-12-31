import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import NotFound from "../pages/Notfound";
import { Home } from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
