import * as Types from './constants';
import Request from 'src/helpers/Request';
import _ from 'lodash';
import { sendCouponAPI } from 'src/constants/apiURL';

export const fetchCourses = (ids = getCartFromLS()) => {
    return dispatch => {
        return Request.makePost(sendCouponAPI, { items: _.uniq(ids) })
            .then(res => {
                dispatch({
                    type: Types.CART_FETCH_SUCCESS,
                    payload: _.get(res, 'data.data.items')
                });
            })
            .catch(e => {});
    };
};

export const addToCart = (id, ref) => {
    return dispatch => {
        const ids = [...getCartFromLS(), id];
        const partnerkey = getPartnerkeyFromLS() || {};
        if (ref) {
            partnerkey[id] = ref;
        }
        updateLocalStorage(ids);
        partnerkeyLocalStorage(partnerkey);
        dispatch(fetchCourses(ids));
    };
};

export const removeFromCart = id => {
    return dispatch => {
        const ids = getCartFromLS().filter(item => item !== id);
        updateLocalStorage(ids);
        dispatch(fetchCourses(ids));
    };
};

export const updateCart = (ids = []) => {
    return dispatch => {
        updateLocalStorage(ids);
        dispatch(fetchCourses(ids));
    };
};

function updateLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function partnerkeyLocalStorage(partnerkey) {
    localStorage.setItem('partnerkey', JSON.stringify(partnerkey));
}

function getCartFromLS() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function getPartnerkeyFromLS() {
    return JSON.parse(localStorage.getItem('partnerkey')) || {};
}

export const initCart = () => dispatch => {
    const cart = getCartFromLS() || [];
    dispatch({
        type: Types.CART_INIT_COURSE,
        payload: cart.length
    });
};

export const clearCart = () => dispatch => {
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('partnerkey');
    dispatch({
        type: Types.CART_CLEAR_COURSE
    });
};
