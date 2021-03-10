import { combineReducers } from 'redux';
import entities from './entities';
import commentCourseData from './combines/commentCourseData';

export default combineReducers({
    commentCourseData,
    entities
});
