import { combineReducers } from 'redux';
import reply from './reply';
import comments from './comments';

export default combineReducers({ reply, comments });
