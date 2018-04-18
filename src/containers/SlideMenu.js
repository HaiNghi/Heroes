import { connect } from 'react-redux';

import SlideMenu from '../components/SlideMenu';
import {
    logOut,
    loadSpinner
} from '../actions';
import { processLogOut } from '../api/api';

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    logOutSuccess: state.auth.logOutSuccess
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        processLogOut(dispatch, logOut);
    },
    loadingSpinner: () => {
        dispatch(loadSpinner());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
