// context.tsx
import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, PreferencesState, PreferencesActions } from "./reducer";

type PreferencesDispatch = React.Dispatch<PreferencesActions>;

const PreferencesStateContext = createContext<PreferencesState | undefined>(undefined);
const PreferencesDispatchContext = createContext<PreferencesDispatch | undefined>(
  undefined
);

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () => useContext(PreferencesDispatchContext);
