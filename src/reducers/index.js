import { combineReducers } from 'redux';

import { reducers } from 'src/redux-utils';
import { SUCCESS_REQUEST_LOGOUT } from 'src/redux-utils/auth/constants';

const appReducer = combineReducers({
    ...reducers
});

const rootReducer = (state, action) => {
    if (action.type === SUCCESS_REQUEST_LOGOUT) {
        const { common } = state;
        state = { common };
    }

    return appReducer(state, action);
};

export default rootReducer;
