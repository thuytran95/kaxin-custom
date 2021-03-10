import * as Types from './constants';
const initState = {
    userDetail: {},
    listCommission: {
        rows: [],
        count: 0
    },
    process: {
        current: {},
        rows: []
    },
    listReport: {
        rows: [],
        count: 0
    },
    reportCourse: {
        rows: [],
        count: 0
    }
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.USER_DETAIL_SUCCESS:
            return { ...state, userDetail: action.payload.data };
        case Types.USER_UPDATE_SUCCESS:
            return { ...state, userDetail: action.payload.data };
        case Types.COMMISSION_FETCH_LIST_SUCCESS:
            return { ...state, listCommission: action.payload };
        case Types.PROCESS_CHART_GET_SUCCESS:
            return { ...state, process: action.payload };
        case Types.REPORT_HISTORY_GET_SUCCESS:
            return { ...state, listReport: action.payload };
        case Types.REPORT_COURSE_HISTORY_GET_SUCCESS:
            return { ...state, reportCourse: action.payload };
        default:
            return state;
    }
}
