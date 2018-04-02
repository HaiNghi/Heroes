import { connect } from 'react-redux';

import Histories from '../components/Histories';
import {
    loading,
    getHistoryList
} from '../actions';
import { processGettingHistoryList } from '../api/api';

const mapStateToProps = (state) => ({
    historyList: state.package.historyList
});

const mapDispatchToProps = (dispatch) => ({
    loading: () => {
        dispatch(loading());
    },
    getHistoryList: () => {
       processGettingHistoryList(dispatch, getHistoryList);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
