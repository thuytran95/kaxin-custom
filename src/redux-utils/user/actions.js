import Request from 'src/helpers/Request';
import * as Types from './constants';
import {
    userDetailAPI,
    commissionAPI,
    reportHistoryAPI,
    reportCoursesHistoryAPI,
    reportChartAPI
} from 'src/constants/apiURL';

export const getUserDetail = (id, config = {}) => {
    return dispatch =>
        Request.makeGet(userDetailAPI(id), config).then(res => {
            dispatch({
                type: Types.USER_DETAIL_SUCCESS,
                payload: res.data
            });
            return res.data;
        });
};

export const updateUser = (id, config = {}) => {
    return dispatch =>
        Request.makePut(userDetailAPI(id), config).then(res => {
            dispatch({
                type: Types.USER_UPDATE_SUCCESS,
                payload: res.data
            });
            return res.data;
        });
};

export const listCommission = (params = {}) => {
    return dispatch =>
        Request.makeGet(commissionAPI, params).then(res => {
            dispatch({
                type: Types.COMMISSION_FETCH_LIST_SUCCESS,
                payload: res.data
            });
            return res;
        });
};

//Commission
export const getProcess = (params = {}) => {
    return dispatch =>
        Request.makeGet(reportChartAPI, params).then(res => {
            dispatch({
                type: Types.PROCESS_CHART_GET_SUCCESS,
                payload: res.data
            });
            return res;
        });
};

export const getReportHistory = (params = {}) => {
    return dispatch =>
        Request.makeGet(reportHistoryAPI, params).then(res => {
            dispatch({
                type: Types.REPORT_HISTORY_GET_SUCCESS,
                payload: res.data
            });
            return res;
        });
};

export const getReportCourseHistory = (id, params = {}) => {
    return dispatch =>
        Request.makeGet(`${reportCoursesHistoryAPI}?courseId=${id}`, params).then(res => {
            dispatch({
                type: Types.REPORT_COURSE_HISTORY_GET_SUCCESS,
                payload: res.data
            });
            return res;
        });
};
