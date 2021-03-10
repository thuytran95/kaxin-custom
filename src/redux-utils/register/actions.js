import Request from 'src/helpers/Request';
import { registerAPI } from 'src/constants/apiURL';
import * as Types from './constants';

export function register(params) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_REGISTER,
            isFetching: true
        });
        return Request.makePost(registerAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_REGISTER,
                    payload: res.data,
                    isFetching: false
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_REGISTER,
                        payload: error.response.data,
                        isFetching: false
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_REGISTER,
                        payload: error.message,
                        isFetching: false
                    });
                }
                throw error;
            });
    };
}
