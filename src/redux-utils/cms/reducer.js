import * as Types from './constants';
const initState = {
    errorPage: {},
    listPage: {},
    pageInfo: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_GET_LIST_PAGES:
            return Object.assign({}, state, {
                errorPage: {},
                listPage: {}
            });
        case Types.ERROR_REQUEST_GET_LIST_PAGES:
            return Object.assign({}, state, {
                errorPage: action.payload,
                listPage: {}
            });
        case Types.SUCCESS_REQUEST_GET_LIST_PAGES:
            return Object.assign({}, state, {
                errorPage: {},
                listPage: action.payload
            });
        case Types.FAIL_REQUEST_GET_LIST_PAGES:
            return Object.assign({}, state, {
                errorPage: action.payload,
                listPage: {}
            });
        //DETAIL PAGE
        case Types.BEFORE_REQUEST_GET_PAGE:
            return Object.assign({}, state, {
                errorPage: {},
                pageInfo: {}
            });
        case Types.ERROR_REQUEST_GET_PAGE:
            return Object.assign({}, state, {
                errorPage: action.payload,
                pageInfo: {}
            });
        case Types.SUCCESS_REQUEST_GET_PAGE:
            return Object.assign({}, state, {
                errorPage: {},
                pageInfo: action.payload
            });
        case Types.FAIL_REQUEST_GET_PAGE:
            return Object.assign({}, state, {
                errorPage: action.payload,
                pageInfo: {}
            });
        case Types.PAGEINFO_LIST_SUCCESS:
            return Object.assign({}, state, {
                errorPage: {},
                pageInfo: action.payload
            });
        default:
            return state;
    }
}
