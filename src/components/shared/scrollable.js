import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class Scrollable extends PureComponent {
    render() {
        const { children, ...rest } = this.props;
        return (
            <Scrollbars autoHide {...rest}>
                {children}
            </Scrollbars>
        );
    }
}

Scrollable.propTypes = {
    children: PropTypes.any
};

export default Scrollable;
