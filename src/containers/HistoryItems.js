import { connect } from 'react-redux';

import HistoryItems from '../components/HistoryItem/HistoryItems';
import {
    loading,
    verifyCodeResult,
    closeModal,
    getHistoryDetail,
    rateShipper
} from '../actions';
import { processVerifyingOTPCode, processGettingHistoryDetail, processRating } from '../api/api';

const mapStateToProps = (state) => ({
    showSpinner: state.package.showSpinner,
    message: state.package.message,
    verifySuccess: state.package.verifySuccess,
    verifyFail: state.package.verifyFail,
    historyDetail: state.package.historyDetail, 
    ratingSuccess: state.package.ratingSuccess
});

const mapDispatchToProps = (dispatch) => ({
    loading: () => {
        dispatch(loading());
    },
    verifyOTPCode: (code, packageId) => {
        processVerifyingOTPCode(dispatch, verifyCodeResult, code, packageId);
    },
    disableModal: () => {
        dispatch(closeModal());
    },
    getHistoryDetail: (id) => {
        processGettingHistoryDetail(dispatch, getHistoryDetail, id);
    },
    rateShipper: (historyId, rating, comment) => {
        processRating(dispatch, rateShipper, historyId, rating, comment);
    },
    closeRatingSuccessModal: () => {
        dispatch(rateShipper());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItems);
