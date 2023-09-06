import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NotFound = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div className="text-center text-3xl font-extrabold">
      <h1>404 error page not found</h1>
      <button id="backToHomeButton">
        <Link to="/" className="ml-6 text-blue-300 hover:text-black">
          Go Home
          {"value " + auth}
        </Link>
      </button>
    </div>
  );
};
export default NotFound;
