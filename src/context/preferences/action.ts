// actions.ts
import { PreferencesActions } from "./reducer";

export const updateFavoriteSports = (dispatch: any, favoriteSports: string[]) => {
  dispatch({ type: "UPDATE_FAVORITE_SPORTS", payload: favoriteSports });
};

export const updateFavoriteTeams = (dispatch: any, favoriteTeams: string[]) => {
  dispatch({ type: "UPDATE_FAVORITE_TEAMS", payload: favoriteTeams });
};
