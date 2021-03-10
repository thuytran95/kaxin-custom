import _ from 'lodash';
import { cmsPageByIdAPI, cmsPageAPI, cmsPageByUrlAPI } from 'src/constants/apiURL';
import * as Types from './constants';
import Request from 'src/helpers/Request';

export const changeElementProperty = (elementId, property, value, context) => (dispatch, getState) => {
    const { display } = getState();
    dispatch({
        type: Types.PB_CHANGE_PROPS_ACTION,
        action: {
            type: 'changeProp',
            elementId,
            property,
            value,
            display,
            context
        }
    });
};

export const changeElementContent = (elementId, value, context) => dispatch => {
    dispatch({
        type: Types.PB_CHANGE_ELEMENT_CONTENT_ACTION,
        action: {
            type: 'changeContent',
            elementId,
            value,
            context
        }
    });
};

export const changeDocProperty = (property, value) => dispatch => {
    dispatch({
        type: Types.PB_CHANGE_DOC_PROPERTY_ACTION,
        action: {
            type: 'changeDocProperty',
            value,
            context: {
                doc: 'draft',
                property
            }
        }
    });
};

export const selectElement = (elementId, context) => (dispatch, getState) => {
    const { pageBuilder = {} } = getState();
    const id = _.get(pageBuilder, 'selected.id');
    if (id !== elementId)
        dispatch({
            type: Types.PB_SELECT_ELEMENT,
            elementId,
            context
        });
};

export const overElement = (elementId, context) => dispatch => {
    dispatch({
        type: Types.PB_OVER_ELEMENT,
        elementId,
        context
    });
};

export const outElement = (elementId, context) => dispatch => {
    dispatch({
        type: Types.PB_OUT_ELEMENT,
        elementId,
        context
    });
};

export const changeElementLabel = (elementId, value, context) => dispatch => {
    dispatch({
        type: Types.PB_CHANGE_LABEL_ACTION,
        action: {
            type: 'changeLabel',
            elementId,
            value,
            context
        }
    });
};

export const removeElement = (elementId, context) => dispatch => {
    dispatch({
        type: Types.PB_REMOVE_ELEMENT_ACTION,
        action: {
            type: 'remove',
            elementId,
            context
        }
    });
};

export const removeSelectedElement = () => (dispatch, getState) => {
    const { selected } = getState().pageBuilder;

    if (selected) {
        dispatch(removeElement(selected.id, selected.context));
    }
};

export const openElementsMenu = options => dispatch => {
    dispatch({
        type: Types.PB_OPEN_ELEMENT_MENU_ACTION,
        options
    });
};

export const closeElementsMenu = () => dispatch => {
    dispatch({
        type: Types.PB_CLOSE_ELEMENT_MENU_ACTION
    });
};

export const toggleCategory = category => dispatch => {
    dispatch({
        type: Types.PB_TOGGLE_CATEGORY_ACTION,
        category
    });
};

export const addElementAt = (element, destination) => dispatch => {
    dispatch({
        type: Types.PB_ADD_ELEMENT_AT_ACTION,
        action: {
            type: 'new',
            element,
            destination,
            context: destination.context
        }
    });
};

export const onPublishChange = () => (dispatch, getState) => {
    // const { pageBuilder } = getState();
    // console.log(pageBuilder.pageData);
};

export const toggleEditing = () => dispatch => {
    // const { pageBuilder } = getState();
    dispatch({
        type: Types.PB_TOGGLE_EDITING_ACTION
    });
};

export const changePageBuilder = data => dispatch => {
    dispatch({
        type: Types.PB_ON_CHANGE_PAGE_BUILDER_ACTION,
        payload: data
    });
};

export const changeLayoutBuilder = name => (dispatch, getState) => {
    const { pageBuilder } = getState();
    const layouts = _.get(pageBuilder, 'layouts', []);
    const layout = _.find(layouts, { name });
    if (layout)
        dispatch({
            type: Types.PB_ON_CHANGE_LAYOUT_BUILDER_ACTION,
            payload: layout
        });
};

export const setMenuTab = value => dispatch => {
    dispatch({
        type: Types.PB_SET_MENU_TAB_ACTION,
        payload: value
    });
};

export const changeTitlePage = title => dispatch => {
    dispatch({
        type: Types.PB_ON_CHANGE_TITLE_PAGE_ACTION,
        payload: title
    });
};

export const changeRoute = route => dispatch => {
    dispatch({
        type: Types.PB_ON_CHANGE_ROUTE_PAGE_ACTION,
        payload: route
    });
};
// CMS

export const getListPageBuilder = (params = {}) => dispatch => {
    return Request.makeGet(cmsPageAPI, params).then(({ data }) => {
        dispatch({
            type: Types.PB_GET_LIST_PAGE_BUILDER_SUCCESS,
            payload: data.data
        });
        return data.data;
    });
};

export const createPageBuilder = (data, params = {}) => dispatch => {
    return Request.makePost(cmsPageAPI, data).then(({ data }) => {
        dispatch({
            type: Types.PB_ON_CHANGE_PAGE_BUILDER_ACTION,
            payload: data.data
        });
        return data.data;
    });
};

export const updatePage = (id, data) => dispatch => {
    return Request.makePut(cmsPageByIdAPI(id), data).then(({ data }) => {
        return data.data;
    });
};

export const updatePageBuilder = (active = false) => (dispatch, getState) => {
    const { pageBuilder } = getState();
    const { pageData = {} } = pageBuilder;
    //const dataRs = _.omit(pageData, ['id']);
    if (!pageData.id) return Promise.reject(false);
    return Request.makePut(cmsPageByIdAPI(pageData.id), { ...pageData, active }).then(({ data }) => {
        dispatch({
            type: Types.PB_ON_CHANGE_PAGE_BUILDER_ACTION,
            payload: data.data
        });
        return data.data;
    });
};

export const getPageBuilderData = (id, params = {}) => dispatch => {
    return Request.makeGet(cmsPageByIdAPI(id), params).then(({ data }) => {
        dispatch({
            type: Types.PB_GET_PAGE_DATA_BY_ID,
            payload: data.data
        });
        return data.data;
    });
};

export const getPageBuilderDataUrl = (url, params = {}) => dispatch => {
    // let apiURL1 = cmsPageByUrlAPI;
    // if (url) {
    const apiURL1 = `${cmsPageByUrlAPI}/get-page-by-slug?slug=${url}`;
    // }
    return Request.makeGet(apiURL1).then(({ data }) => {
        dispatch({
            type: Types.PB_GET_PAGE_DATA_BY_ID,
            payload: data.data
        });
        return data.data;
    });
};

export const removePageBuilder = id => dispatch => {
    return Request.makeDelete(cmsPageByIdAPI(id)).then(({ data }) => {
        return data.data;
    });
};
