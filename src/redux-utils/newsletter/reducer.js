import * as Types from './constants';
const initState = {
    errorNewsletter: {},
    listNewsletter: {},
    newsletterInfo: {},
    newsletterDetails: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_GET_LIST_NEWSLETTERS:
            return Object.assign({}, state, {
                errorNewsletter: {},
                listNewsletter: {}
            });
        case Types.ERROR_REQUEST_GET_LIST_NEWSLETTERS:
            return Object.assign({}, state, {
                errorNewsletter: action.payload,
                listNewsletter: {}
            });
        case Types.SUCCESS_REQUEST_GET_LIST_NEWSLETTERS:
            return Object.assign({}, state, {
                errorNewsletter: {},
                listNewsletter: action.payload
            });
        case Types.FAIL_REQUEST_GET_LIST_NEWSLETTERS:
            return Object.assign({}, state, {
                errorNewsletter: action.payload,
                listNewsletter: {}
            });
        //DETAIL PAGE
        case Types.BEFORE_REQUEST_GET_NEWSLETTER:
            return Object.assign({}, state, {
                errorNewsletter: {},
                newsletterInfo: {}
            });
        case Types.ERROR_REQUEST_GET_NEWSLETTER:
            return Object.assign({}, state, {
                errorNewsletter: action.payload,
                newsletterInfo: {}
            });
        case Types.SUCCESS_REQUEST_GET_NEWSLETTER:
            return Object.assign({}, state, {
                errorNewsletter: {},
                newsletterInfo: action.payload
            });
        case Types.FAIL_REQUEST_GET_NEWSLETTER:
            return Object.assign({}, state, {
                errorNewsletter: action.payload,
                newsletterInfo: {}
            });
        case Types.SUCCESS_REQUEST_CREATE_NEWSLETTER:
            return Object.assign({}, state, {
                newsletterDetails: action.payload
            });
        default:
            return state;
    }
}
