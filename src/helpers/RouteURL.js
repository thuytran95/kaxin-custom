import { makeSlug } from 'src/helpers/Common';

export const courseDetailLink = ({ id, name }) => {
    return `/khoa-hoc/${id}-${makeSlug(name)}`;
};

export const comboDetailLink = ({ id, name }) => {
    return `/chi-tiet-combo/${id}-${makeSlug(name)}`;
};

export const loginLink = ({ name }) => {
    return `/dang-nhap?redirect=${name}`;
};

export const myCourseDetailLink = ({ id, name }) => {
    return `/khoa-hoc-cua-toi/${id}-${makeSlug(name)}`;
};

export const pageDetailLink = ({ route }) => {
    return `/bai-viet/${route}`;
};

export const pageSearchLink = value => {
    return `/tim-kiem/?s=${value}`;
};

export const pageCategoryLink = ({ id, name }) => {
    return `/danh-muc/${id}-${makeSlug(name)}`;
};

export const buyCourseLink = ({ type, id, name }) => {
    return `/thanh-toan/${type}/${id}-${makeSlug(name)}`;
};

export const buyCourseCTVLink = ({ type, id, name, refs }) => {
    return `/thanh-toan/${type}/${id}-${makeSlug(name)}/${refs}`;
};

export const learningLink = ({ courseId, courseName, lessonId }) => {
    return `${myCourseDetailLink({ id: courseId, name: courseName })}/bai-hoc/${lessonId}`;
};

export const orderHistoryLink = ({ id }) => {
    return `/tai-khoan/lich-su-mua-hang/chi-tiet-don-hang-${id}`;
};

export const noticeLink = () => {
    return `/thong-bao`;
};

export const approvedGV = () => {
    return `/tai-khoan/giang-vien`;
};

export const reportLink = ({ id, fromDate, toDate, status }) => {
    if (fromDate && toDate && status) {
        return `/bao-cao-thu-nhap?courseId=${id}&fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
    } else if (fromDate && toDate && !status) {
        return `/bao-cao-thu-nhap?courseId=${id}&fromDate=${fromDate}&toDate=${toDate}`;
    } else if (!fromDate && !toDate && status) {
        return `/bao-cao-thu-nhap?courseId=${id}&status=${status}`;
    } else {
        return `/bao-cao-thu-nhap?courseId=${id}`;
    }
};

export const noticeDetailLink = ({ id }) => {
    return `/thong-bao/${id}`;
};
