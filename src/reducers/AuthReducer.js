import { 
    INPUT_EMAIL,
    INPUT_PASSWORD,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_SPINNER,
    DISABLE_MODAL
} from '../actions/types';
 
const INITIAL_STATE = { 
     email: '',
     password: '',
     loginSuccess: '',
     loading: false,
     success: false,
     fail: false,
     errorCode: '',
     showModal: false,
};
 
export default (state = INITIAL_STATE, action) => {
     switch (action.type) {
         case INPUT_EMAIL:
             return { ...state,
                     email: action.payload,
             };
         case INPUT_PASSWORD: {
             return { ...state,
                 password: action.payload,
                 fail: false
             };
         }
         case LOGIN_SUCCESS: {
             return { ...state,
                 ...INITIAL_STATE,
                 success: true
             };
         }
         case LOGIN_FAIL: {
             return { ...state,
                 fail: true,
                 showModal: true,
                 errorCode: action.payload
             };
         }
         case LOAD_SPINNER: {
             return { ...state,
                     loading: !state.loading,
              };
         }
         case DISABLE_MODAL: {
             return { ...state,
                     showModal: false,
                     password: ''
             };
         }
         default:
             return state;
     }
};
