import { 
    GET_CUSTOMER_NAME,
    GET_CUSTOMER_PHONE,
    BOOK_PACKAGE,
    GET_DISTANCE_MATRIX,
    GET_PRICE,
    DISABLE_PRICE,
    GET_NORMAL_PACKAGE,
    GET_OPTIONAL_PACKAGE,
    LOADING,
    UNLOAD,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAIL,
    DISABLE_MODAL,
    GET_HISTORY_LIST,
    GET_HISTORY_DETAIL
} from '../actions/types';

const INITIAL_STATE = { 
    customerName: '',
    customerPhone: '',
    success: false,
    showSpinner: false,
    distanceMatrix: '',
    duration: '',
    showPrice: false,
    price: '',
    normalPackageList: [],
    optionalPackageList: [],
    message: '',
    verifySuccess: false,
    verifyFail: false,
    historyList: [],
    historyDetail: {}
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case GET_DISTANCE_MATRIX: {
            return { ...state, 
                    customerName: '',
                    customerPhone: '',
                    distanceMatrix: action.payload.rows[0].elements[0].distance.value,
                    duration: action.payload.rows[0].elements[0].duration.value,
                    
            };
        }
        case GET_CUSTOMER_NAME:
            return { ...state, 
                    customerName: action.payload 
            };
        case GET_CUSTOMER_PHONE:
            return { ...state, 
                    customerPhone: action.payload 
            };
        case BOOK_PACKAGE: 
            return { ...state,
                    success: !state.success,
            };
        case GET_PRICE: 
            return { ...state,
                    showPrice: true,
                    price: action.payload,
            };
        case DISABLE_PRICE:
            return { ...state,
                    showPrice: false
            };
        case GET_NORMAL_PACKAGE:
            return { ...state,
                    normalPackageList: action.payload
            };
        case GET_OPTIONAL_PACKAGE:
            return { ...state,
                    optionalPackageList: action.payload
            };
        case LOADING: 
            console.log(state.showSpinner);
            return { ...state,
                    showSpinner: !state.showSpinner,
            };
        case UNLOAD: {
            return { ...state,
                showSpinner: false
            };
        }
        case DISABLE_MODAL: 
            return { ...state,
                    verifySuccess: false,
                    verifyFail: false
            };
        case VERIFY_CODE_SUCCESS:
            return { ...state,
                    verifySuccess: true,
                    message: action.payload
            };
        case VERIFY_CODE_FAIL:
            return { ...state,
                    verifyFail: true,
                    message: action.payload
            };
        case GET_HISTORY_LIST: 
            return { ...state,
                    historyList: action.payload
            };
        case GET_HISTORY_DETAIL: 
            return { ...state,
                    historyDetail: action.payload
            };
        default:
            return state;
    }
};
