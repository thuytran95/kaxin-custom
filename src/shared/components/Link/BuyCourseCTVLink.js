import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { buyCourseCTVLink } from 'src/helpers/RouteURL';

const BuyCourseCTVLink = ({ type, name, id, refs, children }) => (
    <Link
        as={buyCourseCTVLink({ type, name, id, refs })}
        href={{ pathname: '/thanh-toan/course', query: { id, type, refs } }}
    >
        {children}
    </Link>
);

BuyCourseCTVLink.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    refs: PropTypes.string,
    children: PropTypes.any
};

export default BuyCourseCTVLink;
