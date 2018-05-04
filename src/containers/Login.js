import { connect } from 'react-redux';

import Login from '../components/Login';
import * as Actions from '../actions';
import * as API from '../api/api';

const mapStateToProps = (state) => ({
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    success: state.auth.success,
    fail: state.auth.fail,
    errorCode: state.auth.errorCode,
    showModal: state.auth.showModal
});

const mapDispatchToProps = (dispatch) => ({
    inputEmail: (text) => {
        dispatch(Actions.inputEmail(text));
    },
    inputPassword: (text) => {
        dispatch(Actions.inputPassword(text));
    },
    login: (email, password) => {
        API.processLogin(dispatch, Actions.loginSuccess, Actions.loginFail, Actions.loadSpinner, email, password);
    },
    loadSpinner: () => {
        dispatch(Actions.loadSpinner());
    },
    disableModal: () => {
        dispatch(Actions.disableModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
