import * as Types from './constants';
const initState = {
    listCourse: {
        data: {
            count: 0,
            rows: [],
            totalCourseActive: 0,
            totalCourseDeactive: 0,
            totalCoursePending: 0
        }
    },
    courseDetail: {},
    lessonDetail: {},
    listCombos: {
        rows: [],
        count: 0
    },
    infoCombo: {},
    teacherCourses: {
        rows: [],
        count: 0
    }
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.COURSE_FETCH_LIST_SUCCESS:
            return { ...state, listCourse: action.payload };
        case Types.FETCH_COURSE_DETAIL_SUCCESS:
            return { ...state, courseDetail: action.payload.data };
        case Types.FETCH_LESSON_DETAIL_SUCCESS:
            return { ...state, lessonDetail: action.payload.data };
        case Types.COMBOS_FETCH_LIST_SUCCESS:
            return { ...state, listCombos: action.payload };
        case Types.FETCH_COMBO_DETAIL_SUCCESS:
            return { ...state, infoCombo: action.payload };
        case Types.TEACHER_COURSES_SUCCESS:
            return { ...state, teacherCourses: action.payload };
        default:
            return state;
    }
}
