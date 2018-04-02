import { authenticateUser } from "../utils/communication-manager";
import {setCookie} from "../utils/cookie-handler";
import {SESSION_COOKIE_NAME} from "../constants/configuration";


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
}

export function logOut() {
    return {
        type: "LOGOUT",
        payload: false
    };
}