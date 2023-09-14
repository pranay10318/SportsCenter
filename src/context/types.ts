export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  content:string;
  teams: {
    id: number;
    name: string;
  }[];
}
  
export interface Team {
  id: number;
  name: string;
  plays: string;
}
export interface Sport {
  id: number;
  name: string;
}
export interface Preferences {
  favoriteSports: string[];
  favoriteTeams: string[];
}

export type ArticleActions =
  | { type: "FETCH_ARTICLES_REQUEST" }
  | { type: "FETCH_ARTICLES_SUCCESS"; payload: Article[] }
  | { type: "FETCH_ARTICLES_FAILURE"; payload: string }
  
export interface ArticlesState {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type PreferencesActions =
  | { type: "FETCH_PREFERENCES_REQUEST" }
  | { type: "FETCH_PREFERENCES_SUCCESS"; payload: Preferences }
  | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }
  | { type: "UPDATE_PREFERENCES_REQUEST" }
  | { type: "UPDATE_PREFERENCES_SUCCESS"; payload: Preferences }
  | { type: "UPDATE_PREFERENCES_FAILURE"; payload: string };

  
export interface PreferencesState {
  preferences: Preferences;
  isPLoading: boolean;
  isPError: boolean;
  prefErrorMessage: string;
}
export const initialPrefState: PreferencesState = {
  preferences: {
    favoriteSports: [],
    favoriteTeams: [],
  },
  isPLoading: false,
  isPError: false,
  prefErrorMessage: "",
};