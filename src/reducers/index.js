import { combineReducers} from 'redux';
import PatientReducer from ' ./active_patient';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
    active_patient: PatientReducer,
    authReducer: AuthReducer
})