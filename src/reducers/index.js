import { combineReducers } from 'redux'; 
import MapReducer from './MapReducer';
import HandleDataReducer from './HandleDataReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    map: MapReducer,
    package: HandleDataReducer,
    auth: AuthReducer
});
