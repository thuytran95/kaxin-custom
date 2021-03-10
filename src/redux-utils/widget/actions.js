import Request from 'src/helpers/Request';
import {
    widgetRouteAPI,
    fieldByWidgetAPI,
    widgetFeaturedTopic,
    widgetCouponCourse,
    widgetSliderCourseNews,
    widgetSliderCourseSale,
    widgetSliderCourseHighlighs,
    widgetDiscountCourse
} from 'src/constants/apiURL';
import * as Types from './constants';

export function listWidgetRoute(params = {}) {
    return dispatch => {
        Request.makeGet(widgetRouteAPI).then(res => {
            dispatch({
                type: Types.SUCCESS_FETCH_WIDGET_ROUTE_LIST,
                payload: res.data
            });
        });
    };
}

export function listFieldByWidget(widget, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_WIDGET_FIELD_LIST,
            payload: {
                widget,
                data: {},
                isFetching: true
            }
        });
        Request.makeGet(fieldByWidgetAPI({ widget }), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_FIELD_LIST,
                    payload: {
                        widget,
                        data: res.data,
                        isFetching: false
                    }
                });
            })
            .catch(() => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_FIELD_LIST,
                    payload: {
                        widget,
                        data: {},
                        isFetching: false
                    }
                });
            });
    };
}

export function listFeaturedTopic(params = []) {
    const url = `${widgetFeaturedTopic}?categories=[${params}]`;
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_FEATURED_TOPIC,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_FEATURED_TOPIC,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listCategoryHighlights(params = []) {
    const url = `${widgetFeaturedTopic}?categories=[${params}]`;
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_CATEGORY_HIGHLIGHS,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_CATEGORY_HIGHLIGHS,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listCouponCourse(params = []) {
    const url = `${widgetCouponCourse}?couponCode="${params}"`;
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_COUPON_COURSE,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_COUPON_COURSE,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listSliderCourseNews(params = []) {
    let url = widgetSliderCourseNews;
    if (params.newCommentNews) {
        url = `${widgetSliderCourseNews}?comment=lastest&start=0&limit=${parseInt(params.numberNew, 0)}`;
    } else if (params.hotCommentNews) {
        url = `${widgetSliderCourseNews}?comment=top&start=0&limit=${parseInt(params.numberNew, 0)}`;
    } else {
        url = `${widgetSliderCourseNews}?start=0&limit=${parseInt(params.numberNew, 0)}`;
    }
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_SLIDER_COURSE_NEW,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_SLIDER_COURSE_NEW,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listSliderCourseHighlight(params = []) {
    let url = `${widgetSliderCourseHighlighs}?courses=[${params.items}]`;
    if (params.newComment) {
        url = `${widgetSliderCourseHighlighs}?courses=[${params.items}]&comment=lastest`;
    } else if (params.hotComment) {
        url = `${widgetSliderCourseHighlighs}?courses=[${params.items}]&comment=top`;
    } else {
        url = `${widgetSliderCourseHighlighs}?courses=[${params.items}]`;
    }
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_SLIDER_COURSE_HIGHLIGHTS,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_SLIDER_COURSE_HIGHLIGHTS,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listSliderCourseSale(params = []) {
    let url = widgetSliderCourseSale;
    if (params.newCommentSale) {
        url = `${widgetSliderCourseSale}?comment=lastest&start=0&limit=${parseInt(params.numberSale, 0)}`;
    } else if (params.hotCommentSale) {
        url = `${widgetSliderCourseSale}?comment=top&start=0&limit=${parseInt(params.numberSale, 0)}`;
    } else {
        url = `${widgetSliderCourseSale}?start=0&limit=${parseInt(params.numberSale, 0)}`;
    }
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_SLIDER_COURSE_SALE,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_SLIDER_COURSE_SALE,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listDiscountCourse(params = []) {
    const url = `${widgetDiscountCourse}?promotionId=${params}&type=discount`;
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_DISCOUNT_COURSE,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_DISCOUNT_COURSE,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}

export function listGiftCodeCourse(params = []) {
    const url = `${widgetDiscountCourse}?promotionId=${params}&type=gift`;
    return dispatch => {
        return Request.makeGet(url)
            .then(({ data }) => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_GIFTCODE_COURSE,
                    payload: {
                        data: data.data,
                        isFetching: false
                    }
                });
                return data;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_GIFTCODE_COURSE,
                    payload: {
                        data: {},
                        isFetching: false
                    }
                });
                throw err;
            });
    };
}
