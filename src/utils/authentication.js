import store from '../store/store';
import { loggedIn, loggedOut } from '../actions/actions';
import { SESSION_COOKIE_NAME } from '../constants/configuration';
import { setCookie, deleteCookie, getCookie } from './cookie-handler';
import { authenticateUser } from '../utils/communication-manager';
import * as actionTypes from '../actionTypes/actionTypes';
import {LOGGED_IN} from "../actionTypes/actionTypes";

/**
 * Authenticates an user.
 * @param {*} userID User id.
 * @param {*} provider Provider the user used to login.
 */
export function authenticate(userID) {
    authenticateUser(userID).then(function (response) {
        setCookie(SESSION_COOKIE_NAME, response.message);
        //console.log("Login");
        response["isLoggedIn"] = "true";
        store.dispatch(loggedIn({
            type: LOGGED_IN
        }));
    }).catch(function (error) {
        console.log(error);
    });
}


/**
 * Logs out the user.
 */
export function logout() {
  store.dispatch(loggedOut());
  deleteCookie(SESSION_COOKIE_NAME)
}

/**
 * Updates the auth info.
 */
export function updateAuthInfo() {
  let sessionCookie = getCookie(SESSION_COOKIE_NAME);

  if (sessionCookie !== null) {
    let response = {
        accessToken: "AmazingToken",
        type: actionTypes.LOGGED_IN
    }
    store.dispatch(loggedIn(response['type']));    
  }
}