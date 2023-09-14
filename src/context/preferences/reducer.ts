import {PreferencesActions, PreferencesState, initialPrefState } from "../types";

// Reducer  is a function which would update state based on dispatched actions.
// takes '''currentState''' and '''dispatchedAction''' as input and returns '''updatedState'''.
// typescript requires the type of state and actions
// state in reducer have only data  NO setter function required
// action i.e. dispatched action would have a type as js object, containing type of dispatch and args like payload
export const reducer = (
  state: PreferencesState = initialPrefState,
  action: PreferencesActions
): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isPLoading: true,
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isPLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isPLoading: false,
        isPError: true,
        prefErrorMessage: action.payload,
      };
    case "UPDATE_PREFERENCES_REQUEST":
      return {
        ...state,
        isPLoading: true,
      };
    case "UPDATE_PREFERENCES_SUCCESS":
      return {
        ...state,
        isPLoading: false,
        preferences: action.payload,
      };
    case "UPDATE_PREFERENCES_FAILURE":
      return {
        ...state,
        isPLoading: false,
        isPError: true,
        prefErrorMessage: action.payload,
      };
    default:
      return state;
  }
};
