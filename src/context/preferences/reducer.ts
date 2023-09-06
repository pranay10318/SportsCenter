// reducer.ts
export interface PreferencesState {
    favoriteSports: string[];
    favoriteTeams: string[];
  }
  
  export type PreferencesActions =
    | { type: "UPDATE_FAVORITE_SPORTS"; payload: string[] }
    | { type: "UPDATE_FAVORITE_TEAMS"; payload: string[] };
  
  export const initialState: PreferencesState = {
    favoriteSports: [], // Initialize with user's favorite sports
    favoriteTeams: [],  // Initialize with user's favorite teams
  };
  
  export const reducer = (
    state: PreferencesState = initialState,
    action: PreferencesActions
  ): PreferencesState => {
    switch (action.type) {
      case "UPDATE_FAVORITE_SPORTS":
        return { ...state, favoriteSports: action.payload };
      case "UPDATE_FAVORITE_TEAMS":
        return { ...state, favoriteTeams: action.payload };
      default:
        return state;
    }
  };
  