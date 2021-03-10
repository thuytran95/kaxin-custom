import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { pageCategoryLink } from 'src/helpers/RouteURL';

const CategoryLink = ({ name, id }) => (

    <Link as={pageCategoryLink({ name, id })} href={{ pathname: '/khoa-hoc', query: { id } }}>
        <a>{name}</a>
    </Link>
);

CategoryLink.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
};
export default CategoryLink;
