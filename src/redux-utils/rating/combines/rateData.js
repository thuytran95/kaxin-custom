import * as Types from './../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case Types.RATING_SUCCESS_FETCH_DATA_BY_COURSE:
            return { ...state, [action.payloadId]: action.payload };

        default:
            return state;
    }
};
