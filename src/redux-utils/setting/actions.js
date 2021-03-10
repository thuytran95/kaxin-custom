import Request from 'src/helpers/Request';
import * as Types from './constants';
import { listSettingAPI, settingAPI } from 'src/constants/apiURL';

export function getSettings(query = {}, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_LIST_SETTINGS
        });
        return Request.makeGet(listSettingAPI, query, config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_LIST_SETTINGS,
                    payload: res.data.data.rows
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_LIST_SETTINGS,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_LIST_SETTINGS,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function getSetting(id, config = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_GET_SETTING
        });
        return Request.makeGet(settingAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_GET_SETTING,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_GET_SETTING,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_GET_SETTING,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}
