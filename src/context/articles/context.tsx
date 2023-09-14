// src/context/members/context.tsx

// This is the place where we use useReducer => takes reducer func and initial state as args / ip
// and for using the state and dispatch entire the app, wee need to do create contexts for them
// and here in we need to share the values of state and dispatch for other components   so value will be as like as that

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { ArticleActions, ArticlesState } from "../types";

export type ArticlesDispatch = React.Dispatch<ArticleActions>;

const ArticlesStateContext = createContext<ArticlesState | undefined>(undefined);
const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(
  undefined
);

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};
export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => {
  const dispatch = useContext(ArticlesDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useArticlesDispatch must be used within a ArticlesProvider');
  }
  return dispatch;
};

