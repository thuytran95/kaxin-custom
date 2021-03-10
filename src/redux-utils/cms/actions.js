import Request from 'src/helpers/Request';
import * as Types from './constants';
import { listPageAPI, pageAPI } from 'src/constants/apiURL';

export function getPages(query = {}, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_LIST_PAGES
        });
        return Request.makeGet(listPageAPI, query, config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_LIST_PAGES,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_LIST_PAGES,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_LIST_PAGES,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export const pageInfo = (query = {}, config = {}) => {
    return dispatch =>
        Request.makeGet(listPageAPI, query, config).then(res => {
            dispatch({
                type: Types.PAGEINFO_LIST_SUCCESS,
                payload: res.data
            });
            return res;
        });
};

export function getPage(slug, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_PAGE
        });
        return Request.makeGet(pageAPI(slug), config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_PAGE,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_PAGE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_PAGE,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}
