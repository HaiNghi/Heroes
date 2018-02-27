import { Dimensions } from 'react-native';
import { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOOGLE_SEARCH_RESULT, 
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_PICK_UP,
    GET_DROP_OFF,
    DELETE_RESULT_ADDRESS
} from '../actions/types';

const INITIAL_STATE = { 
    region: {}, 
    inputData: {}, 
    resultTypes: {}, 
    predictions: {},
    pickUp: '',
    dropOff: '',
    pickUpObj: {},
    dropOffObj: {},
    nextRegion: {},
    pickUpRegion: {},
    currentLocation: { pickUp: false, dropOff: false },
    arrayMarker: [],
    deleted: false
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDEDELTA = 0.0922;
const LONGTITUDEDELTA = ASPECT_RATION * LATITUDEDELTA;


export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case GET_CURRENT_LOCATION:
            return { ...state, 
                    region: {
                        latitude: action.payload.coords.latitude,
                        longitude: action.payload.coords.longitude,
                        latitudeDelta: LATITUDEDELTA,
                        longitudeDelta: LONGTITUDEDELTA
                        },
                    // arrayMarker:[...state.arrayMarker,region]
             };
        case GET_INPUT:
            return { ...state, 
                    inputData: { [action.payload.key]: action.payload.value
                }
            };
        case GET_PICK_UP:
            return { ...state, 
                    pickUp: action.payload
            };
        case GET_DROP_OFF:
            return { ...state, 
                    dropOff: action.payload
            };
        case TOOGLE_SEARCH_RESULT: {
            if (action.payload === 'pickUp') {
                return { ...state, 
                        resultTypes: { pickUp: true, dropOff: false }, 
                        predictions: {} };
            } else {
                return { ...state, 
                    resultTypes: { pickUp: false, dropOff: true }, 
                    predictions: {} 
                };
            }
        }
        case GET_ADDRESS_PREDICTIONS:
            return { ...state, 
                    predictions: action.payload 
            };
        case GET_SELECTED_ADDRESS: {
            console.log(state.resultTypes.pickUp);
            console.log(action.payload);
            if (state.resultTypes.pickUp) {
                return { ...state,
                        resultTypes: { pickUp: false, dropOff: false }, 
                        pickUp: action.payload.name,
                        region: {
                            latitude: action.payload.latitude,
                            longitude: action.payload.longitude,
                            latitudeDelta: LATITUDEDELTA,
                            longitudeDelta: LONGTITUDEDELTA
                        },
                        pickUpRegion: state.region,
                        currentLocation: { pickUp: !state.currentLocation.pickUp, dropOff: state.currentLocation.dropOff },
                        // arrayMarker:[...state.arrayMarker,pickUpRegion]
                };
            } else {
                return { ...state,
                    dropOff: action.payload.name,
                    resultTypes: { pickUp: false, dropOff: false }, 
                    nextRegion: {
                        latitude: action.payload.latitude,
                        longitude: action.payload.longitude,
                        latitudeDelta: LATITUDEDELTA,
                        longitudeDelta: LONGTITUDEDELTA
                    },
                    currentLocation: { pickUp: state.currentLocation.pickUp, 
                                    dropOff: !state.currentLocation.dropOff },
                    // arrayMarker:[...state.arrayMarker,nextRegion]
                };
            }
        }
        case DELETE_RESULT_ADDRESS: {
            if (action.payload === 'pickUp') {
                return { ...state, 
                        pickUp: '',
                        resultTypes: { pickUp: false, dropOff: false }, 
                        deleted: true,
                        region: state.pickUpRegion
                };
            } else {
                return { ...state, 
                    dropOff: '',
                    resultTypes: { pickUp: false, dropOff: false }, 
                    deleted: true,
                    nextRegion: {}
                };
            }
        }
        default:
            return state;
    }
};
