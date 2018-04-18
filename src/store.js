import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "./reducers/authReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

export default createStore(
    combineReducers({ auth }),
    {},
    applyMiddleware(logger, thunk)
);
