import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import settings from './settings';

export default class ContainerElement extends PureComponent {
    static propTypes = {
        renderChildren: PropTypes.func.isRequired
    };

    static settings = settings;

    render() {
        const { renderChildren } = this.props;

        return <Fragment>{renderChildren()}</Fragment>;
    }
}
