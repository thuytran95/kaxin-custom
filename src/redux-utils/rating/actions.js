import { normalize } from 'normalizr';
import _ from 'lodash';
import Request from 'src/helpers/Request';
import { ratingSchema } from 'src/schemas';
import * as Types from './constants';
import { ratingAPI, ratingStatisticsAPI } from 'src/constants/apiURL';

export const sendRating = (data = {}) => dispatch => {
    data = { type: 'courses', ...data };
    return Request.makePost(ratingAPI, data).then(res => {
        const normalizedData = normalize(_.get(res, 'data.data', {}), ratingSchema);
        dispatch({
            type: Types.RATING_SUCCESS_RATING_BY_COURSE,
            payloadId: data.enityId,
            ...normalizedData
        });
        return res.data;
    });
};

export const getStatisticsRating = (data = {}, query = {}) => dispatch => {
    data = { type: 'courses', ...data };
    return Request.makeGet(ratingStatisticsAPI(data), query)
        .then(res => {
            dispatch({
                type: Types.RATING_SUCCESS_FETCH_DATA_BY_COURSE,
                payloadId: data.enityId,
                payload: _.get(res, 'data.data', {})
            });
            return true;
        })
        .catch(() => true);
};

export const getRatingList = (id, query = {}) => dispatch => {
    const filter = [
        { operator: 'eq', value: id, property: 'enityId' },
        { operator: 'eq', value: 'courses', property: 'type' }
    ];
    Object.assign(query, { filter: JSON.stringify(filter) });
    return Request.makeGet(ratingAPI, query)
        .then(res => {
            const normalizedData = normalize(_.get(res, 'data.data.rows', []), [ratingSchema]);
            dispatch({
                type: Types.RATING_SUCCESS_FETCH_LIST_BY_COURSE,
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
