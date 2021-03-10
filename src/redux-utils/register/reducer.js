import * as Types from './constants';
const initState = {
    isFetching: false,
    errorRegister: {},
    userRegister: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_REGISTER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorRegister: {},
                userRegister: {}
            });
        case Types.ERROR_REQUEST_REGISTER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorRegister: action.payload,
                userRegister: {}
            });
        case Types.SUCCESS_REQUEST_REGISTER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorRegister: {},
                userRegister: action.payload
            });
        case Types.FAIL_REQUEST_REGISTER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorRegister: action.payload,
                userRegister: {}
            });
        default:
            return state;
    }
}
