const DEFAULT_AUTHENTICATION_STATE = { isLoggedIn: false, accessToken: undefined };

const authReducer = (state = DEFAULT_AUTHENTICATION_STATE, action) => {
    switch(action.type){
        case "LOGIN":
            state = {
                ...state,
                isLoggedIn: true,
                accessToken: action.payload
            };
            break;
        case "LOGOUT":
            state = {
                ...state,
                isLoggedIn: false
            };
            break;
        case "AUTH_FAILED":
            state = {
                ...state,
            };
            break;
        default:
            break;
    }
    return state;
};

export default authReducer;