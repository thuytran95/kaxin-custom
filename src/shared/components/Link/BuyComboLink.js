import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { buyCourseLink } from 'src/helpers/RouteURL';

const BuyComboLink = ({ type, name, id, children }) => (
    <Link as={buyCourseLink({ type, name, id })} href={{ pathname: '/thanh-toan/combo', query: { id, type } }}>
        {children}
    </Link>
);

BuyComboLink.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.any
};

export default BuyComboLink;
