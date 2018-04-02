import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes/actionTypes';

const DEFAULT_AUTHENTICATION_STATE = { isLoggedIn: false, accessToken: undefined };


function authentication(state = DEFAULT_AUTHENTICATION_STATE, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return state = {
        isLoggedIn: true
      };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  authentication
});

const rootReducer = function (state, action) {

  console.log("actionType: " + action.type);
  if (action.type === actionTypes.LOGGED_OUT) {
    state = null;
  }

  return appReducer(state, action);
};

export default rootReducer;