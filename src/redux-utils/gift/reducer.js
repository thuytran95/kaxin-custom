import * as Types from './constants';
const initState = {
    errorGift: {},
    myGift: {
        rows: []
    },
    redeem: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_MY_GIFT:
            return Object.assign({}, state, {
                errorGift: {},
                myGift: {}
            });
        case Types.ERROR_REQUEST_MY_GIFT:
            return Object.assign({}, state, {
                errorGift: action.payload,
                myGift: {}
            });
        case Types.SUCCESS_REQUEST_MY_GIFT:
            return Object.assign({}, state, {
                errorGift: {},
                myGift: action.payload
            });
        case Types.FAIL_REQUEST_MY_GIFT:
            return Object.assign({}, state, {
                errorGift: action.payload,
                myGift: {}
            });

        // My Course
        case Types.BEFORE_REQUEST_REDEEM_GIFTCODE:
            return Object.assign({}, state, {
                errorGift: {},
                redeem: {}
            });
        case Types.ERROR_REQUEST_REDEEM_GIFTCODE:
            return Object.assign({}, state, {
                errorGift: action.payload,
                redeem: {}
            });
        case Types.SUCCESS_REQUEST_REDEEM_GIFTCODE:
            return Object.assign({}, state, {
                errorGift: {},
                redeem: action.payload
            });
        case Types.FAIL_REQUEST_REDEEM_GIFTCODE:
            return Object.assign({}, state, {
                errorGift: action.payload,
                redeem: {}
            });

        default:
            return state;
    }
}
