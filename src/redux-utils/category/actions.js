import Request from 'src/helpers/Request';
import * as Types from './constants';
import { categoryAPI, listCategoryAPI, categoryDetailAPI, catHightLightAPI } from 'src/constants/apiURL';

export const listCategoryMenu = (params = {}) => {
    return dispatch => {
        Request.makeGet(listCategoryAPI, params).then(({ data }) => {
            dispatch({ type: Types.CATEGORY_SUCCESS_FETCH_LIST_MENU, payload: data.data });
        });
    };
};

export const listCategory = (params = {}) => {
    return dispatch => {
        return Request.makeGet(listCategoryAPI, params)
            .then(({ data }) => {
                dispatch({ type: Types.CATEGORY_LIST_SUCCESS, payload: data.data });
                return data.data;
            })
            .catch(err => {
                return {};
            });
    };
};

export const listCateTop = (params = {}) => {
    return dispatch => {
        return Request.makeGet(categoryAPI, params)
            .then(({ data }) => {
                dispatch({ type: Types.CATEGORY_TOP_SUCCESS, payload: data });
                return data;
            })
            .catch(err => {
                throw err;
            });
    };
};

export const listCateHightlight = (params = {}) => {
    return dispatch => {
        return Request.makeGet(categoryAPI, params)
            .then(({ data }) => {
                dispatch({ type: Types.CATEGORY_HIGHTLIGHT_SUCCESS, payload: data });
                return data;
            })
            .catch(err => {
                throw err;
            });
    };
};

export const getCategory = (id, params = {}) => {
    return dispatch => {
        return Request.makeGet(categoryDetailAPI(id), params)
            .then(res => {
                dispatch({ type: Types.INFO_CATEGORY_SUCCESS, payload: res.data.data });
                return res;
            })
            .catch(err => {
                throw err;
            });
    };
};
//Get Cat HomePage

export const catTopIndex = (params = {}) => {
    return dispatch => {
        return Request.makeGet(catHightLightAPI, params)
            .then(({ data }) => {
                dispatch({ type: Types.CATEGORY_TOP_SUCCESS, payload: data });
                return data;
            })
            .catch(err => {
                throw err;
            });
    };
};

export const cateHightlightIndex = (params = {}) => {
    return dispatch => {
        return Request.makeGet(catHightLightAPI, params)
            .then(({ data }) => {
                dispatch({ type: Types.CATEGORY_HIGHTLIGHT_SUCCESS, payload: data });
                return data;
            })
            .catch(err => {
                throw err;
            });
    };
};
