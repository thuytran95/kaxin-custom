import _ from 'lodash';
export default (state = {}, action) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.ratings) {
                return _.merge({}, state, action.entities.ratings);
            }

            return state;
    }
};
