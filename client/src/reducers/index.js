import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers ({
// passing in keys that are used for state
    auth: authReducer

});