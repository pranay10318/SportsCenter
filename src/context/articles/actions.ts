import { API_ENDPOINT } from "../../config/constants";
import { ArticlesDispatch } from "./context";
// import { ArticlesDispatch } from "./context";

// these actions are called from any other child components with a argument dispatch in it

export const fetchArticles = async (dispatch: ArticlesDispatch) => {
  try {
    console.log('fetch is called')
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`);
    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });

  } catch (error) {
    console.log("Error fetching ARTICLES:", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load Members",
    });
  }
};

