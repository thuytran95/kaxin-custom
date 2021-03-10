import _ from 'lodash';
import Request from 'src/helpers/Request';
import Srt2VTT from 'src/helpers/Srt2VTT';
import axios from 'axios';
import {
    uploadMediaAPI,
    listPageAPI,
    configAPI,
    myNoticeAPI,
    readNoticeAPI,
    resetBaggyAPI,
    deviceTokenAPI,
    resetReadAPI,
    seoAPI,
    manualNoticeAPI
} from 'src/constants/apiURL';
import * as Types from './constants';

export const getConfig = params => {
    return dispatch => {
        return Request.makeGet(configAPI)
            .then(res => {
                dispatch({
                    type: Types.COMMON_FETCH_CONFIG_SUCCESS,
                    payload: res.data
                });
                return res;
            })
            .catch(err => {
                //
            });
    };
};

export function uploadImage(data = { file: {}, type: 'media' }, params = {}) {
    const { file, type } = data;
    let url = `${uploadMediaAPI}/${type}`;
    if (type === 'editor') {
        url = uploadMediaAPI;
    }
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_UPLOAD_FILE
        });
        return Request.makeUpload(url, file, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_UPLOAD_FILE,
                payload: res.data
            });
            return res;
        });
    };
}

export function uploadCV(data = { file: {}, type: 'url' }, params = {}) {
    const { file, type } = data;
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_UPLOAD_FILE
        });
        return Request.makeUpload(`${uploadMediaAPI}/${type}`, file, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_UPLOAD_FILE,
                payload: res.data
            });
            return res;
        });
    };
}
export const getFooterPages = (query = {}) => (dispatch, getState) => {
    const { common: { footerPages = [] } } = getState();
    if (footerPages.length <= 0)
        Request.makeGet(listPageAPI, query)
            .then(res => {
                dispatch({
                    type: Types.COMMON_SUCCESS_REQUEST_LIST_FOOTER_PAGE,
                    payload: _.get(res, 'data.data.rows', [])
                });
            })
            .catch(err => {
                //
            });
};

export const setKeycloak = keycloak => (dispatch, getState) => {
    dispatch({
        type: Types.COMMON_SET_KEYCLOAK,
        payload: keycloak
    });
};
export const getManualNotice = (params = {}) => {
    return dispatch =>
        Request.makeGet(manualNoticeAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_GET_MA_NOTICE,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const getMyNotice = (params = {}) => {
    return dispatch =>
        Request.makeGet(myNoticeAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_MY_NOTICE,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const isRead = (id, params = {}) => {
    return dispatch =>
        Request.makePut(readNoticeAPI(id), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_ISREAD,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const resetBaggy = (params = {}) => {
    return dispatch =>
        Request.makePut(resetBaggyAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_RESETBAGGY,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const resetRead = (params = {}) => {
    return dispatch =>
        Request.makePut(resetReadAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_RESET_READ,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};
export const incrementBaggy = (total = 1) => (dispatch, getState) => {
    const { common } = getState();
    const totalBaggy = _.get(common, 'myNotice.totalBaggy', 0);
    dispatch({
        type: Types.NOTIFY_INCREMENT,
        payload: totalBaggy + total
    });
};
export const countManual = (total = 1) => (dispatch, getState) => {
    const { common } = getState();
    const totalManual = _.get(common, 'totalManual', 0);
    dispatch({
        type: Types.NOTIFY_MANUAL_COUNT,
        payload: totalManual + total
    });
};

export const resetManual = () => (dispatch, getState) => {
    dispatch({
        type: Types.NOTIFY_MANUAL_RESET
    });
};

export const getDataPush = (data = {}) => (dispatch, getState) => {
    dispatch({
        type: Types.NOTIFY_GET_DATAPUSH,
        payload: data
    });
};

export const deviceToken = (params = {}) => {
    return dispatch =>
        Request.makePost(deviceTokenAPI, params)
            .then(res => {
                dispatch({
                    type: Types.NOTIFY_PUSH_DEVICE_TOKEN,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export function cancelUpload(params) {
    return dispatch => {
        return Request.cancelRequest();
    };
}

export const convertSrt = link => {
    return axios
        .get(link, {
            responseType: 'blob'
        })
        .then(res => {
            return new Srt2VTT(res.data).getURL();
        });
};

export const getSEO = (params = {}) => {
    return dispatch => {
        return Request.makeGet(seoAPI, params)
            .then(res => {
                dispatch({ type: Types.COMMON_SEO_SUCCESS, payload: res.data.data });
                return res;
            })
            .catch(err => {
                //
            });
    };
};

export const getMyNoticeDetail = (params = {}) => {
    return dispatch =>
        Request.makeGet(myNoticeAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_MY_NOTICE_DETAIL,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};
