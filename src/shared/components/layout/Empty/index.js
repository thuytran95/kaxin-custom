import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class EmptyComponent extends Component {
    static propTypes = {
        children: PropTypes.any
    };
    render() {
        const { children } = this.props;
        return (
            <Fragment>
                <div className="onesignal-customlink-container">{children}</div>
            </Fragment>
        );
    }
}

export default EmptyComponent;
