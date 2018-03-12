import { connect } from 'react-redux';

import Home from '../components/Home';
import {
    getCurrentLocation, 
    getInputData, 
    toogleSearchResult,
    getAddressPredictions,
    getSelectedAddress,
    getPickUp,
    getDropOff,
    deleteResultAddress
} from '../actions';


const mapStateToProps = (state) => ({
    region: state.map.region,
    inputData: state.map.inputData || {},
    resultTypes: state.map.resultTypes || {},
    predictions: state.map.predictions || [],
    pickUp: state.map.pickUp,
    dropOff: state.map.dropOff,
    nextRegion: state.map.nextRegion || {},
    currentLocation: state.map.currentLocation,
    arrayMarker: state.map.arrayMarker,
    deleted: state.map.deleted,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentLocation: () => {
        dispatch(getCurrentLocation());
    },
    getInputData: () => {
        dispatch(getInputData());
    },
    toogleSearchResult: (text) => {
        dispatch(toogleSearchResult(text));
    },
    getAddressPredictions: (text, { region }) => {
        dispatch(getAddressPredictions(text, { region }));
    },
    getSelectedAddress: (placeID) => {
        dispatch(getSelectedAddress(placeID));
    },
    getPickUp: (text) => {
        dispatch(getPickUp(text));
    },
    getDropOff: (text) => {
        dispatch(getDropOff(text));
    },
    deleteResultAddress: (text) => {
        dispatch(deleteResultAddress(text));
    },
   
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
