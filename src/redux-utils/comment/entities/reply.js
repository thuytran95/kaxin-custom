import _ from 'lodash';
export default (state = {}, action) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.reply) {
                return _.merge({}, state, action.entities.reply);
            }

            return state;
    }
};
