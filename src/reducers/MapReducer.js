import { Dimensions } from 'react-native';
import * as Types from '../actions/types';

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
    deleted: false,
    distanceMatrix: ''
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDEDELTA = 0.02;
const LONGTITUDEDELTA = ASPECT_RATION * LATITUDEDELTA;


export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
        case Types.GET_CURRENT_LOCATION: {
            const LATITUDE = action.payload.coords.latitude;
            const LONGTITUDE = action.payload.coords.longitude;
            return { ...state, 
                region: {
                        latitude: LATITUDE,
                        longitude: LONGTITUDE,
                        latitudeDelta: LATITUDEDELTA,
                        longitudeDelta: LONGTITUDEDELTA
                },
                pickUpRegion: {
                    latitude: LATITUDE,
                    longitude: LONGTITUDE,
                    latitudeDelta: LATITUDEDELTA,
                    longitudeDelta: LONGTITUDEDELTA
                },
                pickUp: '',
                dropOff: '',
                nextRegion: {
                    latitude: null,
                    longitude: null,
                    latitudeDelta: null,
                    longitudeDelta: null
                }
                // arrayMarker:[...state.arrayMarker,region]
                };
            }
           
        case Types.GET_INPUT:
            return { ...state, 
                    inputData: { [action.payload.key]: action.payload.value
                }
            };
        case Types.GET_PICK_UP:
            return { ...state, 
                    pickUp: action.payload,
                    region: state.pickUpRegion
            };
        case Types.GET_DROP_OFF:
            return { ...state, 
                    dropOff: action.payload,
            };
        case Types.TOOGLE_SEARCH_RESULT: {
            // console.log(state.resultTypes);
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
        case Types.GET_ADDRESS_PREDICTIONS:
            return { ...state, 
                    predictions: action.payload 
            };
        case Types.GET_SELECTED_ADDRESS: {
            // console.log(state.resultTypes.pickUp);
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
        case Types.DELETE_RESULT_ADDRESS: {
            // console.log(state.pickUpRegion);
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
                    nextRegion: {
                        latitude: null,
                        longitude: null,
                        latitudeDelta: null,
                        longitudeDelta: null
                    }
                };
            }
        }
        case Types.DELETE_INPUT: 
            return { ...state,
                pickUp: '',
                dropOff: '',
                region: state.pickUpRegion,
                nextRegion: {
                    latitude: null,
                    longitude: null,
                    latitudeDelta: null,
                    longitudeDelta: null
                }
             };
        
        
        default:
            return state;
    }
};
