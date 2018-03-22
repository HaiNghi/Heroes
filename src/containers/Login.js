import { connect } from 'react-redux';

import Login from '../components/Login';
import {
    inputEmail,
    inputPassword,
    loginSuccess,
    loginFail,
    loadSpinner,
    disableModal
} from '../actions';
import { processLogin } from '../api/api';

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
        dispatch(inputEmail(text));
    },
    inputPassword: (text) => {
        dispatch(inputPassword(text));
    },
    login: (email, password) => {
        processLogin(dispatch, loginSuccess, loginFail, loadSpinner, email, password);
    },
    loadSpinner: () => {
        dispatch(loadSpinner());
    },
    disableModal: () => {
        dispatch(disableModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
