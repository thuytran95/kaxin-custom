import _ from 'lodash';
import * as Types from './../constants';

const onSuccessRating = (state, action) => {
    const data = _.get(state, action.payloadId, { total: 0, rows: [] });

    data.rows = [action.result, ...data.rows];
    return { ...state, [action.payloadId]: { ...data } };
};

export default (state = {}, action) => {
    switch (action.type) {
        case Types.RATING_SUCCESS_FETCH_LIST_BY_COURSE:
            return { ...state, [action.payloadId]: action.payload };
        case Types.RATING_SUCCESS_RATING_BY_COURSE:
            return onSuccessRating(state, action);

        default:
            return state;
    }
};
