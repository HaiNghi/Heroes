import { combineReducers } from 'redux'; 
import MapReducer from './MapReducer';
import HandleDataReducer from './HandleDataReducer';

export default combineReducers({
    map: MapReducer,
    package: HandleDataReducer
});
