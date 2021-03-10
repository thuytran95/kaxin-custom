import layouts from 'src/helpers/page-builder/layouts';
import * as Types from './constants';
// import _ from ''

export const initState = {
    pageListData: {
        rows: [],
        count: 0
    },
    layouts,
    pageData: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case Types.PB_GET_PAGE_DATA_BY_ID:
            return { ...initState, pageData: action.payload.rows[0] };
        default:
            return state;
    }
};
