import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { myCourseDetailLink } from 'src/helpers/RouteURL';

const MyCourseLink = ({ name, id, children }) => (
    <Link as={myCourseDetailLink({ name, id })} href={{ pathname: '/khoa-hoc/chi-tiet/owner', query: { id } }}>
        <a>{children ? children : name}</a>
    </Link>
);

MyCourseLink.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.element
};
export default MyCourseLink;
