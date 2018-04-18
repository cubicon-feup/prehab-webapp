import {SESSION_COOKIE_NAME} from "../constants/configuration";
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
    if (sessionCookie !== null) {
        return  {
            type: "LOGIN",
            payload: sessionCookie
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
    return  {
        type: "LOGIN",
        payload: jwt,
        role: role

export function signIn(jwt) {
    setCookie(SESSION_COOKIE_NAME, jwt);
    return  {
        type: "LOGIN",
        payload: jwt

    }
}

export function logOut() {
    deleteCookie(SESSION_COOKIE_NAME);
    return {
        type: "LOGOUT"
    }
}