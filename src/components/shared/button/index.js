import styles from './index.scss';

import cx from 'classnames';
import { forEach } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button``;

export default class ButtonComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        primary: PropTypes.bool,
        full: PropTypes.bool,
        big: PropTypes.bool,
        noBackground: PropTypes.bool,
        bordered: PropTypes.bool,
        grey: PropTypes.bool,
        small: PropTypes.bool,
        thin: PropTypes.bool,
        smallFont: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        primary: true,
        full: false,
        big: false,
        noBackground: false,
        bordered: false,
        smallFont: false,
        disabled: false
    };

    render() {
        const { onClick, className, children, ...rest } = this.props;

        let resultClassName = cx(styles.button, className);
        forEach(rest, (value, key) => {
            if (styles[key] && value) {
                resultClassName = cx(resultClassName, styles[key]);
            }
        });

        return (
            <Button {...rest} className={resultClassName} onClick={onClick} style={this.props.style}>
                {children}
            </Button>
        );
    }
}
