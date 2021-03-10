import * as Types from './constants';
const initState = {
    errorSetting: {},
    listSetting: {},
    settingInfo: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_GET_LIST_SETTINGS:
            return Object.assign({}, state, {
                errorSetting: {},
                listSetting: {}
            });
        case Types.ERROR_REQUEST_GET_LIST_SETTINGS:
            return Object.assign({}, state, {
                errorSetting: action.payload,
                listSetting: {}
            });
        case Types.SUCCESS_REQUEST_GET_LIST_SETTINGS:
            return Object.assign({}, state, {
                errorSetting: {},
                listSetting: action.payload
            });
        case Types.FAIL_REQUEST_GET_LIST_SETTINGS:
            return Object.assign({}, state, {
                errorSetting: action.payload,
                listSetting: {}
            });
        //DETAIL PAGE
        case Types.BEFORE_REQUEST_GET_SETTING:
            return Object.assign({}, state, {
                errorSetting: {},
                settingInfo: {}
            });
        case Types.ERROR_REQUEST_GET_SETTING:
            return Object.assign({}, state, {
                errorSetting: action.payload,
                settingInfo: {}
            });
        case Types.SUCCESS_REQUEST_GET_SETTING:
            return Object.assign({}, state, {
                errorSetting: {},
                settingInfo: action.payload
            });
        case Types.FAIL_REQUEST_GET_SETTING:
            return Object.assign({}, state, {
                errorSetting: action.payload,
                settingInfo: {}
            });

        default:
            return state;
    }
}
