import immer from 'immer';
import * as Types from './constants';

const initState = {
    routeData: {},
    widgetField: {},
    courseSliderHighlight: [],
    courseSliderNews: [],
    courseSliderSale: []
};

const fieldByWidget = (state, data) => {
    return Object.assign({}, state.widgetField, {
        [data.widget]: {
            data: data.data || {},
            isFetching: data.isFetching || false
        }
    });
};

export default function widget(state = initState, action) {
    return immer(state, draftState => {
        switch (action.type) {
            case Types.SUCCESS_FETCH_WIDGET_ROUTE_LIST:
                draftState.routeData = action.payload;
                return;

            case Types.SUCCESS_FETCH_WIDGET_FIELD_LIST:
                draftState.widgetField = fieldByWidget(state, action.payload);
                return;

            case Types.SUCCESS_FETCH_WIDGET_SLIDER_COURSE_NEW:
                return { ...state, courseSliderNews: action.payload.data };

            case Types.ERROR_FETCH_WIDGET_SLIDER_COURSE_NEW:
                return { ...state, courseSliderNews: [] };

            default:
                return;
        }
    });
}
