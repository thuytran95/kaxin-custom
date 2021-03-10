import Request from 'src/helpers/Request';
import * as Types from './constants';
import _ from 'lodash';
import {
    activeCodeAPI,
    courseDetailAPI,
    ordersAPI,
    orderAPI,
    orderHistoriesAPI,
    verificationAPI,
    sendCouponAPI
} from 'src/constants/apiURL';

export function getOrderInfo(id) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_INFO_ORDER
        });
        return Request.makeGet(orderAPI(id))
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_INFO_ORDER,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_INFO_ORDER,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_INFO_ORDER,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function activeCourse(params) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_ACTIVECODE
        });
        return Request.makePost(activeCodeAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_ACTIVECODE,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_ACTIVECODE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_ACTIVECODE,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function getCourse(id) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_COURSE
        });
        return Request.makeGet(courseDetailAPI(id))
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_COURSE,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_COURSE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_COURSE,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function createOrder(params) {
    return dispatch => {
        return Request.makePost(ordersAPI, params)
            .then(res => {              
                dispatch({
                    type: Types.SUCCESS_REQUEST_CREATE_ORDER,
                    payload: res.data && res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    // console.log(error);
                   
                    dispatch({
                        type: Types.ERROR_REQUEST_CREATE_ORDER,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CREATE_ORDER,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function updateOrder(id, params) {
    return dispatch => {
        return Request.makePut(orderAPI(id), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_UPDATE_ORDER,
                    payload: res.data && res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_CREATE_ORDER,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CREATE_ORDER,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function clearOrder() {
    return {
        type: Types.CLEAR_ORDER
    };
}

export function getOrderHistories(params) {
    return dispatch => {
        return Request.makeGet(orderHistoriesAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_ORDER_HISTORIES,
                    payload: _.get(res, 'data.data')
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_ORDER_HISTORIES,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_ORDER_HISTORIES,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function getOrderHistory(id, params) {
    return dispatch => {
        return Request.makeGet(orderAPI(id), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_ORDER_HISTORY,
                    payload: res.data && res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_ORDER_HISTORY,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_ORDER_HISTORY,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function verificationOrder(params) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_CHECK_ORDER,
            isFetching: true
        });
        return Request.makePost(verificationAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_CHECK_ORDER,
                    payload: res.data.data,
                    isFetching: false
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_CHECK_ORDER,
                        payload: error.response.data,
                        isFetching: false
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CHECK_ORDER,
                        payload: error.message,
                        isFetching: false
                    });
                }
                throw error;
            });
    };
}

export function sendCoupon(params) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_CHECK_COUPON,
            isFetching: true
        });
        return Request.makePost(sendCouponAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_CHECK_COUPON,
                    payload: res.data.data,
                    isFetching: false
                });
                return res.data.data;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_CHECK_COUPON,
                        payload: error.response.data,
                        isFetching: false
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CHECK_COUPON,
                        payload: error.message,
                        isFetching: false
                    });
                }
                throw error;
            });
    };
}
