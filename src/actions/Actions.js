import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOOGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_PICK_UP,
    GET_DROP_OFF,
    DELETE_RESULT_ADDRESS,
    GET_CUSTOMER_NAME,
    GET_CUSTOMER_PHONE,
    BOOK_PACKAGE,
    GET_DISTANCE_MATRIX,
    GET_PRICE,
    DISABLE_PRICE,
    GET_NORMAL_PACKAGE,
    GET_OPTIONAL_PACKAGE,
    LOADING,
    UNLOAD
} from './types';

export const getCurrentLocation = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            {
                enableHighAccurancy: true, timeout: 20000, maximumAge: 1000 }
        );
    };
};

export const getInputData = (text) => {
    return {
        type: GET_INPUT,
        payload: text
    };
};

export const getPickUp = (text) => {
    return {
        type: GET_PICK_UP,
        payload: text
    };
};

export const getDropOff = (text) => {
    return {
        type: GET_DROP_OFF,
        payload: text
    };
};

export const toogleSearchResult = (text) => {
    return {
        type: TOOGLE_SEARCH_RESULT,
        payload: text
    };
};
export const getAddressPredictions = (text, { region }) => {
    return (dispatch) => {
        console.log(text);
        RNGooglePlaces.getAutocompletePredictions(text,
            {
                type: 'establishments',
                country: 'VN',
                latitude: region.latitude,
                longitude: region.longitude,
                longitudeDelta: region.longitudeDelta,
                latitudeDelta: region.latitudeDelta,
                radius: 0.01
            }
        ).then((results) => dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: results
        }))
        .catch((error) => console.log(error.message));
    };
};

export const getSelectedAddress = (address) => {
    return (dispatch) => {
        RNGooglePlaces.lookUpPlaceByID(address)
        .then((results) => {
            dispatch({
                type: GET_SELECTED_ADDRESS,
                payload: results
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
    };
};

export const deleteResultAddress = (text) => {
    return {
        type: DELETE_RESULT_ADDRESS,
        payload: text
    };
};

export const getCustomerName = (text) => {
    return {
        type: GET_CUSTOMER_NAME,
        payload: text
    };
};

export const getCustomerPhone = (text) => {
    return {
        type: GET_CUSTOMER_PHONE,
        payload: text
    };
};
export const bookPackage = () => {
    return {
        type: BOOK_PACKAGE 
    };
};

export const getPrice = (price) => {
    return {
        type: GET_PRICE,
        payload: price
    };
};

export const getDistanceMatrix = (region, nextRegion) => {
    return (dispatch) => {
        axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: region.latitude + ',' + region.longitude,
                destinations: nextRegion.latitude + ',' + nextRegion.longitude,
                mode: 'driving',
                key: 'AIzaSyBSw2SzeTbROHDQHohGL-5_tfKE52EoZUc'
            }
          })
          .then((response) => {
            dispatch({
                type: GET_DISTANCE_MATRIX,
                payload: response.data
            });
          });
    };
};

export const disablePrice = () => {
    return {
        type: DISABLE_PRICE
    };
};

export const getNormalPackage = (list) => {
    return {
        type: GET_NORMAL_PACKAGE,
        payload: list
    };
};

export const getOptionalPackage = (list) => {
    return {
        type: GET_OPTIONAL_PACKAGE,
        payload: list
    };
};

export const loading = () => {
    return {
        type: LOADING
    };
};

export const unload = () => {
    return {
        type: UNLOAD
    };
};
