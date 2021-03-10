import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { buyCourseLink } from 'src/helpers/RouteURL';

const BuyCourseLink = ({ type, name, id, children }) => (
    <Link as={buyCourseLink({ type, name, id })} href={{ pathname: '/thanh-toan/course', query: { id, type } }}>
        {children}
    </Link>
);

BuyCourseLink.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.any
};

export default BuyCourseLink;
