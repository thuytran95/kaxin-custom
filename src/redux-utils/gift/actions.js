import Request from 'src/helpers/Request';
import * as Types from './constants';
import { myGiftfAPI, redeemGiftAPI } from 'src/constants/apiURL';

export function getMyGift(params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_MY_GIFT
        });
        return Request.makeGet(myGiftfAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_MY_GIFT,
                    payload: res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_MY_GIFT,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_MY_GIFT,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export function redeemGiftCode(params) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_REDEEM_GIFTCODE
        });
        return Request.makePost(redeemGiftAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_REDEEM_GIFTCODE,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_REDEEM_GIFTCODE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_REDEEM_GIFTCODE,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}
