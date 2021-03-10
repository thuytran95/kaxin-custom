import * as Types from './constants';

export const initState = {
    isRefreshToken: false,
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    errorUser: {},
    userInfo: {},
    hasRequestLogin: false,
    hasRequestMe: true,
    errorLogin: {},
    successLogout: false,
    myCourses: {},
    cities: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case Types.BEFORE_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: true,
                token: '',
                refreshToken: '',
                userInfo: {},
                errorLogin: {}
            };
        case Types.ERROR_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: false,
                token: '',
                refreshToken: '',
                userInfo: {},
                errorLogin: action.payLoad
            };
        case Types.SUCCESS_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestLogin: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                errorLogin: {}
            };

        case Types.RESET_LOGOUT_REQUEST:
        case Types.BEFORE_REQUEST_LOGOUT:
            return { ...state, successLogout: false };
        case Types.SUCCESS_REQUEST_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: {},
                token: '',
                refreshToken: '',
                successLogout: true
            };

        case Types.BEFORE_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: true
            };
        case Types.ERROR_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: false,
                token: '',
                refreshToken: '',
                userInfo: {}
            };
        case Types.SUCCESS_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestMe: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            };

        case Types.TOGGLE_FULL_PERMISSION:
            return {
                ...state,
                isFullPermission: !state.isFullPermission
            };

        case Types.BEFORE_REQUEST_REFRESH_TOKEN:
            return { ...state, isRefreshToken: true };
        case Types.SUCCESS_REQUEST_REFRESH_TOKEN:
            return {
                ...state,
                isRefreshToken: false,
                token: action.payload.access_token,
                refreshToken: action.payload.refresh_token
            };

        case Types.USER_UPDATE_SUCCESS:
            return { ...state, userInfo: action.payload.user };

        case Types.SUCCESS_REQUEST_MY_COURSES:
            return { ...state, myCourses: action.payload };

        case Types.USER_COURSE_FETCH_LIST_SUCCESS:
            return { ...state, myCourses: action.payload };
        case Types.AUTH_SET_USER_LOGIN:
            return { ...state, userInfo: action.payload, isAuthenticated: true };

        default:
            return state;
    }
};
