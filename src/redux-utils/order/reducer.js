import * as Types from './constants';
const initState = {
    isFetching: false,
    errorActive: {},
    courseActive: {},
    courseInfo: {},
    orderDetails: {},
    orderDetailsHistory: {},
    histories: {},
    orderInfo: {},
    errorCheckout: {},
    checkoutInfo: {},
    cartInfo: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_GET_INFO_ORDER:
            return Object.assign({}, state, {
                errorActive: {},
                orderInfo: {}
            });
        case Types.ERROR_REQUEST_GET_INFO_ORDER:
            return Object.assign({}, state, {
                errorActive: action.payload,
                orderInfo: {}
            });
        case Types.SUCCESS_REQUEST_GET_INFO_ORDER:
            return Object.assign({}, state, {
                errorActive: {},
                orderInfo: action.payload
            });
        case Types.FAIL_REQUEST_GET_INFO_ORDER:
            return Object.assign({}, state, {
                errorActive: action.payload,
                orderInfo: {}
            });
        //Active Code
        case Types.BEFORE_REQUEST_ACTIVECODE:
            return Object.assign({}, state, {
                errorActive: {},
                courseActive: {}
            });
        case Types.ERROR_REQUEST_ACTIVECODE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseActive: {}
            });
        case Types.SUCCESS_REQUEST_ACTIVECODE:
            return Object.assign({}, state, {
                errorActive: {},
                courseActive: action.payload
            });
        case Types.FAIL_REQUEST_ACTIVECODE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseActive: {}
            });
        // My Course
        case Types.BEFORE_REQUEST_MY_COURSE:
            return Object.assign({}, state, {
                errorActive: {},
                courseInfo: {}
            });
        case Types.ERROR_REQUEST_MY_COURSE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseInfo: {}
            });
        case Types.SUCCESS_REQUEST_MY_COURSE:
            return Object.assign({}, state, {
                errorActive: {},
                courseInfo: action.payload
            });
        case Types.FAIL_REQUEST_MY_COURSE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseInfo: {}
            });
        //Detail Course
        case Types.BEFORE_REQUEST_GET_COURSE:
            return Object.assign({}, state, {
                errorActive: {},
                courseInfo: {}
            });
        case Types.ERROR_REQUEST_GET_COURSE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseInfo: {}
            });
        case Types.SUCCESS_REQUEST_GET_COURSE:
            return Object.assign({}, state, {
                errorActive: {},
                courseInfo: action.payload
            });
        case Types.FAIL_REQUEST_GET_COURSE:
            return Object.assign({}, state, {
                errorActive: action.payload,
                courseInfo: {}
            });

        case Types.SUCCESS_REQUEST_CREATE_ORDER:
            return Object.assign({}, state, {
                orderDetails: action.payload
            });
        case Types.SUCCESS_REQUEST_GET_ORDER_HISTORY:
            return Object.assign({}, state, {
                orderDetailsHistory: action.payload
            });
        case Types.SUCCESS_REQUEST_UPDATE_ORDER:
            return Object.assign({}, state, {
                orderDetails: action.payload
            });
        case Types.CLEAR_ORDER:
            return Object.assign({}, state, {
                orderDetails: {}
            });
        case Types.SUCCESS_REQUEST_GET_ORDER_HISTORIES:
            return Object.assign({}, state, {
                histories: action.payload
            });
        //Check Checkout NL
        case Types.BEFORE_REQUEST_CHECK_ORDER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: {},
                checkoutInfo: {}
            });
        case Types.ERROR_REQUEST_CHECK_ORDER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: action.payload,
                checkoutInfo: {}
            });
        case Types.SUCCESS_REQUEST_CHECK_ORDER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: {},
                checkoutInfo: action.payload
            });
        case Types.FAIL_REQUEST_CHECK_ORDER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: action.payload,
                checkoutInfo: {}
            });

        //Check Coupon
        case Types.BEFORE_REQUEST_CHECK_COUPON:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: {},
                cartInfo: {}
            });
        case Types.ERROR_REQUEST_CHECK_COUPON:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: action.payload,
                cartInfo: {}
            });
        case Types.SUCCESS_REQUEST_CHECK_COUPON:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: {},
                cartInfo: action.payload
            });
        case Types.FAIL_REQUEST_CHECK_COUPON:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorCheckout: action.payload,
                cartInfo: {}
            });

        default:
            return state;
    }
}
