import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import settings from './settings';
import propsSchema from './props-schema';

class TextElement extends PureComponent {
    static defaultProps = {
        value: ''
    };
    static propTypes = {
        value: PropTypes.string,
        Element: PropTypes.func.isRequired,
        builder: PropTypes.object
    };

    static settings = settings;
    static propsSchema = propsSchema;

    render() {
        const { Element, builder, value } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        return (
            <Element {...props}>
                <div dangerouslySetInnerHTML={{ __html: value }} />
            </Element>
        );
    }
}

export default TextElement;
