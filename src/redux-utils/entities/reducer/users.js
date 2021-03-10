import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.users) {
                return _.merge({}, state, action.entities.users);
            }

            return state;
    }
};
