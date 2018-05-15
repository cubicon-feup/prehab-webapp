import {SESSION_COOKIE_NAME, SESSION_ROLE} from "../constants/configuration";
import {deleteCookie, getCookie, setCookie} from "../utils/cookie-handler";

/*
import { authenticateUser } from "../utils/communication-manager";
import {setCookie} from "../utils/cookie-handler";
export function logIn(username, password) {
    return dispatch => {
        authenticateUser(username, password).then(function (response) {
            setCookie(SESSION_COOKIE_NAME, response.data.jwt);
            console.log("actions");
            dispatch({
                type: "LOGIN",
                payload: response.data.jwt
            });
        }).catch(function (error) {
            console.log(error);
            dispatch({
                type: "AUTH_FAILED"
            });
        });
    }
*/

/**
 * Updates the auth info.
 */
export function getCookieInfo() {
    let sessionCookie = getCookie(SESSION_COOKIE_NAME);
    let sessionRole = getCookie(SESSION_ROLE);
    if (sessionCookie !== null && sessionRole !== null) {
        return  {
            type: "LOGIN",
            payload: sessionCookie,
            role: sessionRole
        }
    }
    else
    {
        return  {
            type: "LOGOUT"
        }

    }
}

export function signIn(jwt, role) {
    setCookie(SESSION_COOKIE_NAME, jwt);
    setCookie(SESSION_ROLE, role);
    return  {
        type: "LOGIN",
        payload: jwt,
        role: role
    }
}

export function logOut() {
    deleteCookie(SESSION_COOKIE_NAME);
    deleteCookie(SESSION_ROLE);
    return {
        type: "LOGOUT"
    }
}