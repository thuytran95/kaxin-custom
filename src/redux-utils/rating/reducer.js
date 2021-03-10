import { combineReducers } from 'redux';
import rateContentData from './combines/rateContentData';
import rateData from './combines/rateData';
import entities from './entities';

export default combineReducers({ entities, rateData, rateContentData });
