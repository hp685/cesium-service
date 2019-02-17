
export const CHOOSE_SERVICE = 'choose_service';
export const SET_FIELD = 'set_field';
export const SET_RESPONSE = 'set_response';


export const chooseService = (service) => {
    return {
        type: CHOOSE_SERVICE,
        service
    }
}

export const setField = (key, value) => {
    return {
        type: SET_FIELD,
        field: {key: value}
    }
}

export const setResponse = (response) => {
    return {
        type: SET_RESPONSE,
        response
    }
}

