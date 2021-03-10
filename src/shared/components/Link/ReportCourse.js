import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { reportLink } from 'src/helpers/RouteURL';

const ReportCourseLink = ({ id, fromDate, toDate, status, children }) => (
    <Link
        as={reportLink({ id, fromDate, toDate, status })}
        href={{ pathname: '/bao-cao-thu-nhap', query: { id, fromDate, toDate, status } }}
    >
        <a target="_blank">{children}</a>
    </Link>
);

ReportCourseLink.propTypes = {
    id: PropTypes.number,
    children: PropTypes.element,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    status: PropTypes.bool
};

export default ReportCourseLink;
