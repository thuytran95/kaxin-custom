import * as Types from './constants';
const initState = {
    categoryTop: {},
    categoryHighLight: {
        data: {}
    },
    categoryData: {
        rows: []
    },
    categoryMenuData: {
        rows: []
    },
    categoryInfo: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.CATEGORY_TOP_SUCCESS:
            return { ...state, categoryTop: action.payload };
        case Types.CATEGORY_HIGHTLIGHT_SUCCESS:
            return { ...state, categoryHighLight: action.payload };
        case Types.CATEGORY_LIST_SUCCESS:
            return { ...state, categoryData: action.payload };

        case Types.CATEGORY_SUCCESS_FETCH_LIST_MENU:
            return { ...state, categoryMenuData: action.payload };
        case Types.INFO_CATEGORY_SUCCESS:
            return { ...state, categoryInfo: action.payload };
        default:
            return state;
    }
}
