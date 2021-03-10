import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { comboDetailLink } from 'src/helpers/RouteURL';

const ComboLink = ({ name, id, children }) => (
    <Link as={comboDetailLink({ name, id })} href={{ pathname: '/chi-tiet-combo', query: { id } }}>
        {children ? children : <a>{name}</a>}
    </Link>
);

ComboLink.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.element
};

export default ComboLink;
