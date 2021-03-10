import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { orderHistoryLink } from 'src/helpers/RouteURL';

const OrderHistoryLink = ({ id, children }) => (
    <Link as={orderHistoryLink({ id })} href={{ pathname: '/tai-khoan/don-hang', query: { id } }}>
        {children}
    </Link>
);

OrderHistoryLink.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.element
};
OrderHistoryLink.defaultProps = {};

export default OrderHistoryLink;
