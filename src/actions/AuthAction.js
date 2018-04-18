import { 
    LOAD_SPINNER,
    INPUT_EMAIL,
    INPUT_PASSWORD,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    DISABLE_MODAL,
    LOG_OUT
} from './types';

export const inputEmail = (text) => {
    return {
        type: INPUT_EMAIL,
        payload: text
    };
};
export const inputPassword = (text) => {
    return {
        type: INPUT_PASSWORD,
        payload: text
    };
};
export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
    };
};
export const loginFail = (errorCode) => {
    return (dispatch) => {
        dispatch(loadSpinner());
        setTimeout(() => dispatch({
            type: LOGIN_FAIL,
            payload: errorCode
        }), 500);
    };
};

export const loadSpinner = () => {
    return {
        type: LOAD_SPINNER
    };
};

export const disableModal = () => {
    return {
        type: DISABLE_MODAL
    };
};

export const logOut = () => {
    return (dispatch) => {
        dispatch(loadSpinner());
        setTimeout(() => dispatch({
            type: LOG_OUT
        }), 500);
    };
};
