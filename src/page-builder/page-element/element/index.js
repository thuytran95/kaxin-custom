import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Element extends PureComponent {
    static defaultProps = {
        htmlTag: 'div'
    };
    static propTypes = {
        htmlTag: PropTypes.string.isRequired,
        children: PropTypes.any
    };

    render() {
        const { htmlTag: HtmlTag, children, ...rest } = this.props;

        return <HtmlTag {...rest}>{children}</HtmlTag>;
    }
}
