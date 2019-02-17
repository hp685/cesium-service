
export const CHOOSE_SERVICE = 'choose_service';
export const SET_FIELD = 'set_field';
export const SET_RESPONSE = 'set_response';
export const SET_SERVICES = 'set_services';
export const RESET_FORM = 'reset_form';

export const chooseService = (service) => {
    return {
        type: CHOOSE_SERVICE,
        service
    }
}

export const setField = (key, value) => {
    return {
        type: SET_FIELD,
        key,
        value
    }
}

export const setResponse = (response) => {
    return {
        type: SET_RESPONSE,
        response
    }
}

export const setServiceList = (services) =>{
  return {
    type: SET_SERVICES,
    services
  }
}

export const clearForm = () => {
  return {
    type : RESET_FORM
  }
}
