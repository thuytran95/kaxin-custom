import Request from 'src/helpers/Request';
import * as Types from './constants';
import _ from 'lodash';
import {
    courseAPI,
    courseDetailAPI,
    lessonDetailAPI,
    logLessonAPI,
    combosAPI,
    combosDetailAPI,
    teacherCoursesAPI,
    coursePromotionsAPI,
    courseFEAPI,
    courseSaleFEAPI
} from 'src/constants/apiURL';

export const listCourse = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseAPI, query, config)
            .then(res => {
                dispatch({
                    type: Types.COURSE_FETCH_LIST_SUCCESS,
                    payload: res.data,
                    typeFetch: str
                });
                return res.data;
            })
            .catch(err => {
                //
            });
};

export const filterCourse = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseAPI, query, config)
            .then(({ data }) => data.data)
            .catch(err => {
                //
            });
};

export const filterCoursePromotions = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(coursePromotionsAPI, query, config)
            .then(({ data }) => data.data)
            .catch(err => {
                //
            });
};

export const getCourse = (id, config = {}) => {
    return dispatch =>
        Request.makeGet(courseDetailAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.FETCH_COURSE_DETAIL_SUCCESS,
                    payload: res.data
                });
                return res.data;
            })
            .catch(err => {
                //
            });
};

export const getPrice = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseAPI, query, config)
            .then(res => _.get(res, 'data.data.rows[0].price', 0))
            .catch(err => {
                //
            });
};

export const searchCourse = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseAPI, query, config)
            .then(({ data }) => data)
            .catch(err => {
                //
            });
};

export const getLesson = (id, config = {}) => {
    return dispatch =>
        Request.makeGet(lessonDetailAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.FETCH_LESSON_DETAIL_SUCCESS,
                    payload: res.data
                });
                return res.data;
            })
            .catch(err => {
                //
            });
};

export const finishLesson = (id, config = {}) => {
    return dispatch =>
        Request.makePost(logLessonAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.LOG_LESSON_SUCCESS,
                    payload: res.data
                });
                return res.data;
            })
            .catch(err => {
                //
            });
};

//Combos

export const listCombos = (params = {}) => {
    return dispatch =>
        Request.makeGet(combosAPI, params)
            .then(res => {
                dispatch({
                    type: Types.COMBOS_FETCH_LIST_SUCCESS,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const getCombos = (id, config = {}) => {
    return dispatch =>
        Request.makeGet(combosDetailAPI(id), config)
            .then(res => {
                dispatch({
                    type: Types.FETCH_COMBO_DETAIL_SUCCESS,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

export const getPriceCombos = (query = {}, config = {}) => {
    return dispatch =>
        Request.makeGet(combosAPI, query, config)
            .then(res => res.data.data.rows[0].totalPrice)
            .catch(err => {
                //
            });
};

//Teacher Courses
export const teacherCourses = (params = {}) => {
    return dispatch =>
        Request.makeGet(teacherCoursesAPI, params)
            .then(res => {
                dispatch({
                    type: Types.TEACHER_COURSES_SUCCESS,
                    payload: res.data.data
                });
                return res;
            })
            .catch(err => {
                //
            });
};

//Course HOME
export const courseIndex = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseFEAPI, query, config)
            .then(({ data }) => data.data)
            .catch(err => {
                //
            });
};

export const courseSaleIndex = (query = {}, config = {}, str = '') => {
    return dispatch =>
        Request.makeGet(courseSaleFEAPI, query, config)
            .then(({ data }) => data.data)
            .catch(err => {
                //
            });
};
