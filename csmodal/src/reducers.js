import { CHOOSE_SERVICE, SET_FIELD, SET_RESPONSE } from './actions';
import { combineReducers } from 'redux';

const chooseServiceReducer = (state=[], action) => {

    switch(action.type){
        case CHOOSE_SERVICE:
            return Object.assign({}, state, {
                selectedService: action.service,
            });
        default:
            return state;

    } 
}

const setFieldReducer = (fields={}, action) => {
    switch(action.type){
        case SET_FIELD:
            return {...fields, ...action.field}
        default:
            return fields;
    }
}

const setResponseReducer = (response={}, action) => {
    switch(action.type){
        case SET_RESPONSE:
            return {...response}
        default:
            return response;
    }
}

const cesiumApp = () => combineReducers(
    chooseServiceReducer,
    setFieldReducer,
    setResponseReducer,
)

export default cesiumApp;