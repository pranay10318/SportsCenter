// This is the place where we use useReducer => takes reducer func and initial state as args / ip
// and for using the state and dispatch entire the app, wee need to do create contexts for them
// and here in we need to share the values of state and dispatch for other components   so value will be as like as that

import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { PreferencesActions, PreferencesState, initialPrefState } from "../types";

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;

const PreferencesStateContext = createContext<PreferencesState | undefined>(undefined);
const PreferencesDispatchContext = createContext<PreferencesDispatch | undefined>(
  undefined
);

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialPrefState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};
export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () => {
  const dispatch = useContext(PreferencesDispatchContext);
  if (dispatch === undefined) {
    throw new Error('usePreferencesDispatch must be used within a PreferencesProvider');
  }
  return dispatch;
};

