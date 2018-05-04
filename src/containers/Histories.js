import { connect } from 'react-redux';

import Histories from '../components/Histories';
import * as Actions from '../actions';
import * as API from '../api/api';

const mapStateToProps = (state) => ({
    historyList: state.package.historyList
});

const mapDispatchToProps = (dispatch) => ({
    loading: () => {
        dispatch(Actions.loading());
    },
    getHistoryList: () => {
       API.processGettingHistoryList(dispatch, Actions.getHistoryList);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
