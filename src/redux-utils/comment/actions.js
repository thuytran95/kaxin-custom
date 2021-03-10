import _ from 'lodash';
import { normalize } from 'normalizr';
import Request from 'src/helpers/Request';
import * as Types from './constants';
import { commentAPI } from 'src/constants/apiURL';
import { commentSchema, replySchema } from 'src/schemas';

const getUserByAuth = (state = {}) => {
    const userInfo = _.get(state, 'auth.userInfo', {});
    return _.omit(userInfo, ['cvRoot', 'avatarRoot', 'rolePermissions']);
};

export const createComment = (data = {}) => (dispatch, getState) => {
    data = { type: 'courses', ...data };
    const userInfo = getUserByAuth(getState());
    return Request.makePost(commentAPI, data).then(res => {
        const normalizedData = normalize({ ..._.get(res, 'data.data', {}), createdBy: userInfo }, commentSchema);
        dispatch({
            type: Types.COMMENT_SUCCESS_CREATE_BY_COURSE,
            payloadId: data.enityId,
            ...normalizedData
        });
        return res.data;
    });
};

export const createReplyComment = (data = {}) => (dispatch, getState) => {
    data = { type: 'courses', ...data };
    const userInfo = getUserByAuth(getState());
    return Request.makePost(commentAPI, data).then(res => {
        const normalizedData = normalize({ ..._.get(res, 'data.data', {}), createdBy: userInfo }, replySchema);

        dispatch({
            type: Types.COMMENT_SUCCESS_REPLY_BY_COURSE,
            payloadId: data.enityId,
            parentId: data.parentId,
            ...normalizedData
        });
        return res.data;
    });
};

export const getCommentList = (id, query = {}) => dispatch => {
    const filter = [
        { operator: 'eq', value: id, property: 'enityId' },
        { operator: 'eq', value: 'courses', property: 'type' }
    ];
    Object.assign(query, { filter: JSON.stringify(filter) });
    return Request.makeGet(commentAPI, query)
        .then(res => {
            const normalizedData = normalize(_.get(res, 'data.data.rows', []), [commentSchema]);
            dispatch({
                type: Types.COMMENT_SUCCESS_FETCH_LIST_COMMENT,
                payloadId: id,
                payload: {
                    total: _.get(res, 'data.data.count', 0),
                    rows: normalizedData.result
                },
                ...normalizedData
            });
            return true;
        })
        .catch(() => true);
};
