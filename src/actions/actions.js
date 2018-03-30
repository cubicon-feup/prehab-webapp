import * as actionTypes from '../actionTypes/actionTypes';

export function login(data) {
    return dispatch => {
        let res = true;
        return res;
    }
}


export const loggedIn = userInfo => ({ type: actionTypes.LOGGED_IN, userInfo });
export const loggedOut = () => ({ type: actionTypes.LOGGED_OUT });