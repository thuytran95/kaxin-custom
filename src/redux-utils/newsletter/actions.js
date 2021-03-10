import Request from 'src/helpers/Request';
import * as Types from './constants';
import { listNewsletterAPI, newsletterAPI } from 'src/constants/apiURL';

export function getNewsletters(query = {}, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_LIST_NEWSLETTERS
        });
        return Request.makeGet(listNewsletterAPI, query, config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_LIST_NEWSLETTERS,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_LIST_NEWSLETTERS,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_LIST_NEWSLETTERS,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function getNewsletter(id, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_NEWSLETTER
        });
        return Request.makeGet(newsletterAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_NEWSLETTER,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_NEWSLETTER,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_NEWSLETTER,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function createNewsletter(params) {
    return dispatch => {
        return Request.makePost(listNewsletterAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_CREATE_NEWSLETTER,
                    payload: res.data && res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_CREATE_NEWSLETTER,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CREATE_NEWSLETTER,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}
