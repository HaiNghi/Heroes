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
    cancelingTripSuccess: false,
    resendRequestSuccess: false
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
        case Types.RESEND_REQUEST:
            return { ...state,
                resendRequestSuccess: !state.resendRequestSuccess
            };
        default:
            return state;
    }
};
