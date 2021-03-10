import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { pageDetailLink } from 'src/helpers/RouteURL';

const PageLink = ({ route, title }) => (
    <Link as={pageDetailLink({ route })} href={{ pathname: '/bai-viet', query: { route } }}>
        <a>{title}</a>
    </Link>
);

PageLink.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    route: PropTypes.string
};
export default PageLink;
