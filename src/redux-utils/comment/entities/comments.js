import _ from 'lodash';
import * as Types from './../constants';

const addReplyComment = (state, action) => {
    const { parentId } = action;
    const comment = _.get(state, parentId);
    const { listComments = [] } = comment;
    comment.listComments = [...listComments, action.result];
    return {
        ...state
    };
};
export default (state = {}, action) => {
    switch (action.type) {
        case Types.COMMENT_SUCCESS_REPLY_BY_COURSE:
            return addReplyComment(state, action);
        default:
            if (action.entities && action.entities.comments) {
                return _.merge({}, state, action.entities.comments);
            }

            return state;
    }
};
