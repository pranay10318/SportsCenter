import React, { createContext, useState } from "react";

interface PreferenceContextProps {
  favoriteSports: string[];
  favoriteTeams: string[]; 
  setPreferences: (sports: string[], teams: string[]) => void;
}

const PreferenceContext = createContext<PreferenceContextProps>({
  favoriteSports: [],
  favoriteTeams: [],
  setPreferences: () => {}
});

const PreferenceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favoriteSports, setFavoriteSports] = useState<string[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);

  const setPreferences = (sports: string[], teams: string[]) => {
    setFavoriteSports(sports);
    setFavoriteTeams(teams);
  };

  const valueToShare = {
    favoriteSports,
    favoriteTeams,
    setPreferences,
  };

  return (
    <PreferenceContext.Provider value={valueToShare}>
      {children}
    </PreferenceContext.Provider>
  );
};

export { PreferenceContext, PreferenceProvider };
