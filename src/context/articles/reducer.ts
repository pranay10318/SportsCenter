// \src\context\members\reducer.ts

import {ArticleActions, ArticlesState } from "../types";

// Reducer  is a function which would update state based on dispatched actions.
// takes '''currentState''' and '''dispatchedAction''' as input and returns '''updatedState'''.
// typescript requires the type of state and actions
// state in reducer have only data  NO setter function required
// action i.e. dispatched action would have a type as js object, containing type of dispatch and args like payload

export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (
  state: ArticlesState = initialState,
  action: ArticleActions
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLES_FAILURE":

      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return initialState;
  }
};
