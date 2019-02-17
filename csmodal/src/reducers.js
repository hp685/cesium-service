import {
  CHOOSE_SERVICE,
  SET_FIELD,
  SET_RESPONSE,
  SET_SERVICES,
  RESET_FORM,
  } from './actions';
import { combineReducers } from 'redux';
import { defaultState } from './data';
import { zipObject, get }  from 'lodash';
import {createReducer} from 'redux-starter-kit';
import store from './store';
const cesiumApp = createReducer(defaultState, {

  set_services: (state, action) => {
    state.services = action.service;
  },

  set_field: (state, action) => {
    console.log('setting field', state.selectedService, action.key, action.value)
    //state.schema[state.selectedService][action.key] = action.value
    let schema = state.schema
    let serviceFields = {}
    serviceFields[action.key] = action.value
    let newFields = {...state.schema[state.selectedService], ...serviceFields}
    state.schema[state.selectedService] = newFields


  },

  set_response: (state, action) => {

  },

  choose_service: (state, action) => {
    state.selectedService = action.service;
  },

  reset_form: (state, action) => {
    state.schema[state.selectedService] = {};
    state.clearForm = true
  }

})

export default cesiumApp;
