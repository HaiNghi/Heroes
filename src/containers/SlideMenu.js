import { connect } from 'react-redux';

import SlideMenu from '../components/SlideMenu';
import * as Actions from '../actions';
import * as API from '../api/api';

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    logOutSuccess: state.auth.logOutSuccess
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        API.processLogOut(dispatch, Actions.logOut);
    },
    loadingSpinner: () => {
        dispatch(Actions.loadSpinner());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
