import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class ElementText extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const { className, value } = this.props;

        return <div className={cx(className)} dangerouslySetInnerHTML={{ __html: value }} />;
    }
}
