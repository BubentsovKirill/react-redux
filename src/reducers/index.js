import { combineReducers } from 'redux';
import tracks from './tracks';
import filter from './filter';

export default combineReducers({
    tracks,
    filter
})