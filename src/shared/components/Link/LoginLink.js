import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { loginLink } from 'src/helpers/RouteURL';

const BuyCourseLink = ({ name, id, children }) => (
    <Link as={loginLink({ name, id })} href={{ pathname: '/thanh-toan', query: { id } }}>
        {children}
    </Link>
);

BuyCourseLink.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.any
};

export default BuyCourseLink;
