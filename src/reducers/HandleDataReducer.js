// import { 
//     GET_CUSTOMER_NAME,
//     GET_CUSTOMER_PHONE,
//     BOOK_PACKAGE,
//     GET_DISTANCE_MATRIX,
//     GET_PRICE,
//     DISABLE_PRICE,
//     GET_NORMAL_PACKAGE,
//     GET_OPTIONAL_PACKAGE,
//     LOADING,
//     UNLOAD,
//     VERIFY_CODE_SUCCESS,
//     VERIFY_CODE_FAIL,
//     DISABLE_MODAL,
//     GET_HISTORY_LIST,
//     GET_HISTORY_DETAIL,
//     RATE_RATING,
//     CANCEL_TRIP
// } from '../actions/types';
import * as Types from '../actions/types';

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
    historyDetail: {},
    ratingSuccess: false,
    cancelingTripSuccess: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_DISTANCE_MATRIX: {
            return { ...state, 
                    customerName: '',
                    customerPhone: '',
                    distanceMatrix: action.payload.rows[0].elements[0].distance.value,
                    duration: action.payload.rows[0].elements[0].duration.value,
                    
            };
        }
        case Types.GET_CUSTOMER_NAME:
            return { ...state, 
                    customerName: action.payload 
            };
        case Types.GET_CUSTOMER_PHONE:
            return { ...state, 
                    customerPhone: action.payload 
            };
        case Types.BOOK_PACKAGE: 
            return { ...state,
                    success: !state.success,
            };
        case Types.GET_PRICE: 
            return { ...state,
                    showPrice: true,
                    price: action.payload,
            };
        case Types.DISABLE_PRICE:
            return { ...state,
                    showPrice: false
            };
        case Types.GET_NORMAL_PACKAGE:
            return { ...state,
                    normalPackageList: action.payload
            };
        case Types.GET_OPTIONAL_PACKAGE:
            return { ...state,
                    optionalPackageList: action.payload
            };
        case Types.LOADING: 
            console.log(state.showSpinner);
            return { ...state,
                    showSpinner: !state.showSpinner,
            };
        case Types.UNLOAD: {
            return { ...state,
                showSpinner: false
            };
        }
        case Types.DISABLE_MODAL: 
            return { ...state,
                    verifySuccess: false,
                    verifyFail: false
            };
        case Types.VERIFY_CODE_SUCCESS:
            return { ...state,
                    verifySuccess: true,
                    message: action.payload
            };
        case Types.VERIFY_CODE_FAIL:
            return { ...state,
                    verifyFail: true,
                    message: action.payload
            };
        case Types.GET_HISTORY_LIST: 
            return { ...state,
                    historyList: action.payload
            };
        case Types.GET_HISTORY_DETAIL: 
            return { ...state,
                    historyDetail: action.payload,
                    ratingSuccess: false,
                    cancelTrip: false
            };
        case Types.RATE_RATING: 
            return { ...state,
                ratingSuccess: !state.ratingSuccess
            };
        case Types.CANCEL_TRIP:
            return { ...state,
                cancelingTripSuccess: true,
                message: action.payload
            };
        case Types.RESET_CANCEL_TRIP_SUCCESS:
            return { ...state,
                cancelingTripSuccess: false
            };
        default:
            return state;
    }
};
