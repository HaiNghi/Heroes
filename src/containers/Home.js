import { connect } from 'react-redux';

import Home from '../components/Home';
import * as Actions from '../actions';

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
        dispatch(Actions.getCurrentLocation());
    },
    getInputData: () => {
        dispatch(Actions.getInputData());
    },
    toogleSearchResult: (text) => {
        dispatch(Actions.toogleSearchResult(text));
    },
    getAddressPredictions: (text, { region }) => {
        dispatch(Actions.getAddressPredictions(text, { region }));
    },
    getSelectedAddress: (placeID) => {
        dispatch(Actions.getSelectedAddress(placeID));
    },
    getPickUp: (text) => {
        dispatch(Actions.getPickUp(text));
    },
    getDropOff: (text) => {
        dispatch(Actions.getDropOff(text));
    },
    deleteResultAddress: (text) => {
        dispatch(Actions.deleteResultAddress(text));
    },
    deleteInput: () => {
        dispatch(Actions.deleteInput());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
