import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { learningLink } from 'src/helpers/RouteURL';

const LearningLink = ({ courseName, courseId, lessonId, children }) => (
    <Link
        as={learningLink({ courseName, courseId, lessonId })}
        href={{ pathname: '/khoa-hoc/bai-hoc', query: { courseId, lessonId } }}
    >
        {children ? children : <a>{courseName}</a>}
    </Link>
);

LearningLink.propTypes = {
    courseId: PropTypes.number.isRequired,
    courseName: PropTypes.string,
    lessonId: PropTypes.number.isRequired,
    children: PropTypes.element
};
LearningLink.defaultProps = {
    courseName: '',
    children: null
};

export default LearningLink;
