import _ from 'lodash';
import Request from 'src/helpers/Request';
import {
    authAPI,
    meAPI,
    logoutAPI,
    refreshTokenAPI,
    userDetailAPI,
    userCoursesAPI,
    myCoursesAPI,
    listCityAPI,
    changePassAPI,
    unsubscriberAPI
} from 'src/constants/apiURL';
import * as Types from './constants';
import * as Cookie from '../../helpers/Cookie';

export const login = (params, options) => {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_LOGIN
        });
        const data = Object.assign({ grant_type: 'password' }, params);
        return Request.makePost(authAPI, data)
            .then(res => {
                Request.setToken(_.get(res, 'data.data.token.access_token'));
                Request.setRefreshToken(_.get(res, 'data.data.token.refresh_token'));
                dispatch({
                    type: Types.SUCCESS_REQUEST_LOGIN,
                    payload: {
                        user: _.get(res, 'data.data.user'),
                        accessToken: _.get(res, 'data.data.token.access_token'),
                        refreshToken: _.get(res, 'data.data.token.refresh_token')
                    }
                });
                return { success: true, message: 'Login Successfully' };
            })
            .catch(error => {
                dispatch({
                    type: Types.ERROR_REQUEST_LOGIN,
                    payLoad: error.data
                });
                throw error;
            });
    };
};

export const logout = req => {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_LOGOUT
        });
        const params = {
            refresh_token: Cookie.getCookie('refreshToken')
        };
        return Request.makePost(logoutAPI, params)
            .then(res => {
                Request.clearToken(req);
                Request.clearRefreshToken(req);
                dispatch({
                    type: Types.SUCCESS_REQUEST_LOGOUT,
                    payload: res.data
                });
                return true;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_REQUEST_LOGOUT
                });
            });
    };
};

export const changePassword = params => {
    return dispatch => {
        return Request.makePost(changePassAPI, params)
            .then(res => {
                dispatch({
                    type: Types.CHANGE_PASS_SUCCESS,
                    payLoad: res.data
                });
                return res;
            })
            .catch(err => {
                dispatch({
                    type: Types.CHANGE_PASS_ERROR
                });
            });
    };
};

export const logoutSuccess = req => dispatch => {
    Request.clearToken(req);
    Request.clearRefreshToken(req);
    dispatch({
        type: Types.SUCCESS_REQUEST_LOGOUT
    });
    return Promise.resolve(true);
};

export const resetLogout = () => {
    return dispatch => {
        dispatch({
            type: Types.RESET_LOGOUT_REQUEST
        });
    };
};

export const me = () => {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_ME
        });
        return Request.makeGet(meAPI)
            .then(res => {
              
                dispatch({
                    type: Types.SUCCESS_REQUEST_ME,
                    payload: {
                        accessToken: Request.token,
                        refreshToken: Request.refreshToken,
                        user: _.get(res, 'data.data')
                    }
                });
                return res;
            })
            .catch(err => {
                //console.log(err);
                dispatch({
                    type: Types.ERROR_REQUEST_ME
                });
                throw err;
            });
    };
};

export const getCurrentUser = () => {
    return Request.makeGet(meAPI);
};

export const refreshToken = (refresh_token, res) => {
    return async dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_REFRESH_TOKEN
        });
        try {
            const response = await Request.makePost(refreshTokenAPI, { refresh_token });

            if (response) {
                const data = _.get(response, 'data.data', undefined);
                if (data) {
                    await Promise.all([
                        Request.setToken(data.access_token, res),
                        Request.setRefreshToken(data.refresh_token, res)
                    ]);
                }
                dispatch({
                    type: Types.SUCCESS_REQUEST_REFRESH_TOKEN,
                    payload: data
                });
                return response;
            } else {
                const err = { code: 400, message: 'NotFound' };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    };
};

export const updateUser = (id, config = {}) => {
    return dispatch =>
        Request.makePut(userDetailAPI(id), config).then(res => {
            dispatch({
                type: Types.USER_UPDATE_SUCCESS,
                payload: {
                    user: _.get(res, 'data.data')
                }
            });
            return res.data;
        });
};

export function getMyCourses(data, params = { ignoreAuth: true }) {
    return dispatch => {
        return Request.makeGet(myCoursesAPI, data, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_MY_COURSES,
                    payload: _.get(res, 'data.data')
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_MY_COURSES,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_MY_COURSES,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
}

export const getListCity = (config = {}) => {
    return dispatch =>
        Request.makeGet(listCityAPI, config).then(res => {
            return res;
        });
};

export const setUserLogin = (user, config = {}) => dispatch => {
    dispatch({
        type: Types.AUTH_SET_USER_LOGIN,
        payload: user
    });
};

export const getUserCourseList = (id, params = {}) => {
    // return dispatch => {
    //     return Request.makeGet(userCoursesAPI(id), params)
    //         .then(res => {
    //             dispatch({ type: Types.USER_COURSE_FETCH_LIST_SUCCESS, payload: _.get(res, 'data.data') });
    //             return res.data;
    //         })
    //         .catch(err => {
    //             throw err;
    //         });
    // };

    return dispatch => {
        return Request.makeGet(userCoursesAPI(id), params)
            .then(res => {
                dispatch({
                    type: Types.USER_COURSE_FETCH_LIST_SUCCESS,
                    payload: _.get(res, 'data.data')
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.USER_COURSE_FETCH_LIST_ERROR,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.USER_COURSE_FETCH_LIST_FAIL,
                        payload: error.message
                    });
                }
                throw error;
            });
    };
};

export const unSubs = (config = {}) => {
    return dispatch =>
        Request.makePut(unsubscriberAPI, config)
            .then(res => {
                return res;
            })
            .catch(error => {
                throw error;
            });
};
