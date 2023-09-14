import { API_ENDPOINT } from "../../config/constants";
import { Preferences } from "../types";
import { PreferencesDispatch } from "./context";
// import { PreferencesDispatch } from "./context";

// these actions are called from any other child components with a argument dispatch in it

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
  try {
    // console.log('fetch is called')
    dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
    const authToken = localStorage.getItem('authToken');

    let response;
    const initialData = {preferences:{favoriteTeams:[], favoriteSports: []}};
    let data;
    if(authToken) { 
      response =  await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      data = await response.json();
    }
    // console.log(data.preferences)

    // console.log("these are the pref.. ", data.preferences);
    if(data.preferences.favoriteSports)
    dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: data.preferences });
    else 
    dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: initialData.preferences });


  } catch (error) {
    console.log("Error fetching ARTICLES:", error);
    dispatch({
      type: "FETCH_PREFERENCES_FAILURE",
      payload: "Unable to load PREFERENCES",
    });
  }
};

export const updatePreferences = async (
  dispatch: PreferencesDispatch,
  updatedPreferences: Preferences
) => {
  try {
    dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });

    // Replace 'authToken' with the actual way you retrieve the authentication token
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error("Authentication token is missing.");
    }

    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'PATCH',
      body: JSON.stringify({ preferences: updatedPreferences }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update preferences.");
    }

    const data = await response.json();
    dispatch({ type: "UPDATE_PREFERENCES_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.error("Error updating preferences:", error);
    dispatch({
      type: "UPDATE_PREFERENCES_FAILURE",
      payload: "Unable to update preferences",
    });
  }
};