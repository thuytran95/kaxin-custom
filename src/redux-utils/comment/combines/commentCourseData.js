import _ from 'lodash';
import * as Types from './../constants';

const addCommentByCourse = (state, action = {}) => {
    const { payloadId } = action;
    const data = _.get(state, payloadId, { total: 0, rows: [] });
    data.rows = [action.result, ...data.rows];
    return {
        ...state,
        [payloadId]: { ...data }
    };
};

export default (state = {}, action) => {
    switch (action.type) {
        case Types.COMMENT_SUCCESS_FETCH_LIST_COMMENT:
            return { ...state, [action.payloadId]: action.payload };

        case Types.COMMENT_SUCCESS_CREATE_BY_COURSE:
            return addCommentByCourse(state, action);

        default:
            return state;
    }
};
