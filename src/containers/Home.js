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

function mapStateToProps(state) {
    return {
        region: state.map.region,
        inputData: state.map.inputData || {},
        resultTypes: state.map.resultTypes || {},
        predictions: state.map.predictions || [],
        pickUp: state.map.pickUp,
        dropOff: state.map.dropOff,
        pickUpRegion: state.map.pickUpRegion || {},
        nextRegion: state.map.nextRegion || {},
        currentLocation: state.map.currentLocation,
        arrayMarker: state.map.arrayMarker,
        deleted: state.map.deleted
    };
}

export default connect(mapStateToProps, {
    getCurrentLocation, 
    getInputData, 
    toogleSearchResult, 
    getAddressPredictions,
    getSelectedAddress,
    getPickUp,
    getDropOff,
    deleteResultAddress
})(Home);
