import * as Types from './constants';

const initState = {
    locale: 'vi',
    footerPages: [],
    keycloak: {},
    myNotice: {
        rows: [],
        count: 0,
        totalBaggy: 0
    },
    maNotice: {
        rows: [],
        count: 0
    },
    error: {},
    isRead: {},
    notifyPush: {},
    seoCommon: {},
    totalManual: 0,
    myNoticeDetail: {
        rows: [],
        count: 0,
        totalBaggy: 0
    }
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.COMMON_FETCH_CONFIG_SUCCESS:
            return { ...state, ...action.payload };
        case Types.COMMON_SUCCESS_REQUEST_LIST_FOOTER_PAGE:
            
            return { ...state, footerPages: action.payload };
        case Types.COMMON_SET_KEYCLOAK:
            return { ...state, keycloak: action.payload };
        case Types.SUCCESS_GET_MA_NOTICE:
            return Object.assign({}, state, {
                error: {},
                maNotice: action.payload
            });
        case Types.SUCCESS_REQUEST_GET_MY_NOTICE:
            return Object.assign({}, state, {
                error: {},
                myNotice: action.payload
            });
        case Types.SUCCESS_REQUEST_ISREAD:
            return Object.assign({}, state, {
                error: {},
                isRead: action.payload
            });
        case Types.SUCCESS_REQUEST_RESETBAGGY:
            return Object.assign({}, state, {
                error: {},
                myNotice: action.payload
            });
        case Types.SUCCESS_REQUEST_RESET_READ:
            return Object.assign({}, state, {
                error: {},
                myNotice: action.payload
            });
        case Types.NOTIFY_INCREMENT:
            return {
                ...state,
                myNotice: { ...state.myNotice, totalBaggy: action.payload }
            };
        case Types.NOTIFY_MANUAL_COUNT:
            return {
                ...state,
                totalManual: action.payload
            };
        case Types.NOTIFY_MANUAL_RESET:
            return {
                ...state,
                totalManual: 0
            };
        case Types.NOTIFY_GET_DATAPUSH:
            return {
                ...state,
                notifyPush: action.payload
            };
        case Types.COMMON_SEO_SUCCESS:
            return { ...state, seoCommon: action.payload };
        case Types.SUCCESS_REQUEST_GET_MY_NOTICE_DETAIL:
            return Object.assign({}, state, {
                error: {},
                myNoticeDetail: action.payload
            });
        default:
            return state;
    }
}
