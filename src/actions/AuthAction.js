// import { 
//     LOAD_SPINNER,
//     INPUT_EMAIL,
//     INPUT_PASSWORD,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     DISABLE_MODAL,
//     LOG_OUT
// } from './types';
import * as Types from './types';

export const inputEmail = (text) => {
    return {
        type: Types.INPUT_EMAIL,
        payload: text
    };
};
export const inputPassword = (text) => {
    return {
        type: Types.INPUT_PASSWORD,
        payload: text
    };
};
export const loginSuccess = () => {
    return {
        type: Types.LOGIN_SUCCESS,
    };
};
export const loginFail = (errorCode) => {
    return (dispatch) => {
        dispatch(loadSpinner());
        setTimeout(() => dispatch({
            type: Types.LOGIN_FAIL,
            payload: errorCode
        }), 500);
    };
};

export const loadSpinner = () => {
    return {
        type: Types.LOAD_SPINNER
    };
};

export const disableModal = () => {
    return {
        type: Types.DISABLE_MODAL
    };
};

export const logOut = () => {
    return (dispatch) => {
        dispatch(loadSpinner());
        setTimeout(() => dispatch({
            type: Types.LOG_OUT
        }), 500);
    };
};
