import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { courseDetailLink } from 'src/helpers/RouteURL';

const CourseLink = ({ name, id, children }) => (
    <Link as={courseDetailLink({ name, id })} href={{ pathname: '/khoa-hoc/chi-tiet', query: { id } }}>
        {children ? children : <a>{name}</a>}
    </Link>
);

CourseLink.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.element
};

export default CourseLink;
