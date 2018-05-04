import { connect } from 'react-redux';

import HistoryItems from '../components/HistoryItem/HistoryItems';
import * as Actions from '../actions';
import * as API from '../api/api';

const mapStateToProps = (state) => ({
    showSpinner: state.package.showSpinner,
    message: state.package.message,
    verifySuccess: state.package.verifySuccess,
    verifyFail: state.package.verifyFail,
    historyDetail: state.package.historyDetail, 
    ratingSuccess: state.package.ratingSuccess,
    cancelingTripSuccess: state.package.cancelingTripSuccess,
});

const mapDispatchToProps = (dispatch) => ({
    loading: () => {
        dispatch(Actions.loading());
    },
    verifyOTPCode: (code, packageId) => {
        API.processVerifyingOTPCode(dispatch, Actions.verifyCodeResult, code, packageId);
    },
    disableModal: () => {
        dispatch(Actions.closeModal());
    },
    getHistoryDetail: (id) => {
        API.processGettingHistoryDetail(dispatch, Actions.getHistoryDetail, id);
    },
    rateShipper: (historyId, rating, comment) => {
        API.processRating(dispatch, Actions.rateShipper, historyId, rating, comment);
    },
    closeRatingSuccessModal: () => {
        dispatch(Actions.rateShipper());
    },
    cancelTrip: (id) => {
        API.processCancelingTrip(dispatch, Actions.cancelTrip, id);
    },
    resetCanCelingTripSuccess: () => {
        dispatch(Actions.resetCanCelingTripSuccess());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItems);
