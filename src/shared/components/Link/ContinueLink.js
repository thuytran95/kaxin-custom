import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { myCourseDetailLink } from 'src/helpers/RouteURL';

const ContinueLink = ({ name, id }) => (
    <Link as={myCourseDetailLink({ name, id })} href={{ pathname: '/khoa-hoc/chi-tiet/owner', query: { id } }}>
        <a className="btn btn-primary">Tiếp tục học</a>
    </Link>
);

ContinueLink.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
};
export default ContinueLink;
