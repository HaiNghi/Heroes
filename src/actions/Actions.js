import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import * as Types from './types';

export const getCurrentLocation = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: Types.GET_CURRENT_LOCATION,
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
        type: Types.GET_INPUT,
        payload: text
    };
};

export const getPickUp = (text) => {
    return {
        type: Types.GET_PICK_UP,
        payload: text
    };
};

export const getDropOff = (text) => {
    return {
        type: Types.GET_DROP_OFF,
        payload: text
    };
};

export const toogleSearchResult = (text) => {
    return {
        type: Types.TOOGLE_SEARCH_RESULT,
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
            type: Types.GET_ADDRESS_PREDICTIONS,
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
                type: Types.GET_SELECTED_ADDRESS,
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
        type: Types.DELETE_RESULT_ADDRESS,
        payload: text
    };
};

export const getCustomerName = (text) => {
    return {
        type: Types.GET_CUSTOMER_NAME,
        payload: text
    };
};

export const getCustomerPhone = (text) => {
    return {
        type: Types.GET_CUSTOMER_PHONE,
        payload: text
    };
};
export const bookPackage = () => {
    return {
        type: Types.BOOK_PACKAGE 
    };
};

export const getPrice = (price) => {
    return {
        type: Types.GET_PRICE,
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
                type: Types.GET_DISTANCE_MATRIX,
                payload: response.data
            });
          });
    };
};

export const disablePrice = () => {
    return {
        type: Types.DISABLE_PRICE
    };
};

export const getNormalPackage = (list) => {
    return {
        type: Types.GET_NORMAL_PACKAGE,
        payload: list
    };
};

export const getOptionalPackage = (list) => {
    return {
        type: Types.GET_OPTIONAL_PACKAGE,
        payload: list
    };
};

export const loading = () => {
    return {
        type: Types.LOADING
    };
};

export const unload = () => {
    return {
        type: Types.UNLOAD
    };
};
export const verifyCodeResult = (result, type) => {
    return (dispatch) => {
        dispatch(loading());
        if (type === 'success') {
            setTimeout(() => dispatch({
                type: Types.VERIFY_CODE_SUCCESS,
                payload: result
            }), 500);
        } else {
            setTimeout(() => dispatch({
                type: Types.VERIFY_CODE_FAIL,
                payload: result
            }), 500);
        }
    };
};
export const closeModal = () => {
    return {
        type: Types.DISABLE_MODAL
    };
};

export const getHistoryList = (result) => {
    return {
        type: Types.GET_HISTORY_LIST,
        payload: result
    };
};

export const getHistoryDetail = (result) => {
    return {
        type: Types.GET_HISTORY_DETAIL,
        payload: result
    };
};

export const rateShipper = () => {
    return {
        type: Types.RATE_RATING
    };
};

export const cancelTrip = (result) => {
    return {
        type: Types.CANCEL_TRIP,
        payload: result
    };
};

export const resetCanCelingTripSuccess = () => {
    return {
        type: Types.RESET_CANCEL_TRIP_SUCCESS
    };
};

export const deleteInput = () => {
    return {
        type: Types.DELETE_INPUT
    };
};

export const resendPackageRequest = () => {
    return {
        type: Types.RESEND_REQUEST
    };
};

