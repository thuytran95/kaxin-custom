/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DefaultOnSSR = () => <span />;

class NoSSR extends Component {
    state = {
        canRender: false
    };

    componentDidMount() {
        this.setState({ canRender: true });
    }

    render() {
        const { children, onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;

        return canRender ? children : onSSR;
    }
}

NoSSR.propTypes = {
    onSSR: PropTypes.any,
    children: PropTypes.any
};

export default NoSSR;
