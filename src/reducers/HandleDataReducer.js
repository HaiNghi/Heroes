import { 
    GET_CUSTOMER_NAME,
    GET_CUSTOMER_PHONE,
    BOOK_PACKAGE,
    GET_DISTANCE_MATRIX
} from '../actions/types';

const INITIAL_STATE = { 
    customerName: '',
    customerPhone: '',
    success: false,
    distanceMatrix: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case GET_DISTANCE_MATRIX: {
            return { ...state, distanceMatrix: action.payload.rows[0].elements[0].distance.value };
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
                    success: true
            };
        default:
            return state;
    }
};
