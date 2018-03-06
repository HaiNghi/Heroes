import { connect } from 'react-redux';

import Register from '../components/Register';
import {} from '../actions';

// function mapStateToProps(state) {
//     return {
//         region: state.map.region,
//         inputData: state.map.inputData || {},
//         resultTypes: state.map.resultTypes || {},
//         predictions: state.map.predictions || [],
//         pickUp: state.map.pickUp,
//         dropOff: state.map.dropOff,
//         pickUpRegion: state.map.pickUpRegion || {},
//         nextRegion: state.map.nextRegion || {},
//         currentLocation: state.map.currentLocation,
//         arrayMarker: state.map.arrayMarker,
//         deleted: state.map.deleted
//     };
// }

export default connect()(Register);
