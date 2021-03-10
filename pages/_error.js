import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Error401 from './_errors/401';
import Error403 from './_errors/403';
import Error404 from './_errors/404';
import ErrorCommon from './_errors/common';

export default class Error extends PureComponent {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    render() {
        const { statusCode } = this.props;
        switch (statusCode) {
            case 401:
                return <Error401 />;
            case 403:
                return <Error403 />;
            case 404:
                return <Error404 />;

            default:
                return <ErrorCommon />;
        }
    }
}

Error.propTypes = {
    statusCode: PropTypes.number
};
