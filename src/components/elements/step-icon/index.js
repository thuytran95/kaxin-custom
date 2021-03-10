import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
import requireSize from 'components/elements/require-size';
const requireContext = require.context('./size', true, /^\.\/[a-z-]+?\/index\.(js|jsx)$/);
const size = requireSize(requireContext);

class StepIconElement extends PureComponent {
    static defaultProps = {
        layout: 'full_width',
        idSection: 'sectionHow',
        headingTitle: 'LÀM THẾ NÀO?',
        subHeading: 'Trở thành Affiliate',
        stepIcon1: {}
    };
    static propsSchema = propsSchema;

    static settings = settings;

    render() {
        const { Element, builder, layout, ...rest } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        const Layout = _.get(size, _.replace(layout, '-', '_'), 'div');
        return (
            <Element {...props}>
                <Layout {...rest} />
            </Element>
        );
    }
}

StepIconElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    layout: PropTypes.oneOf(['full_width', 'half_width', 'minimun_width'])
};

export default StepIconElement;
