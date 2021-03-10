import * as Types from './constants';

export const initState = {
    courses: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case Types.CART_FETCH_SUCCESS:
            return { courses: action.payload };
        case Types.CART_CLEAR_COURSE:
            return { ...state, courses: [] };

        default:
            return state;
    }
};
