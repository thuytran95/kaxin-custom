import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import propsSchema from './props-schema';
import settings from './settings';
import requireSize from 'components/elements/require-size';

const requireContext = require.context('./size', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);
const size = requireSize(requireContext);

class BannerElement extends PureComponent {
    static defaultProps = {
        align: 'justify',
        heading: 'heading here',
        subHeading: 'sub heading here',
        content: 'Lorem ipsum dolor sit amet',
        buttonText: 'CALL TO ACTION',
        buttonLink: '#',
        image: '',
        layout: 'full_width',
        isEnable: true
    };

    static propsSchema = propsSchema;
    static settings = settings;

    render() {
        const { Element, builder, layout, isEnable, ...rest } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };

        const Layout = _.get(size, _.replace(layout, '-', '_'), 'div');
        return isEnable ? (
            <Element {...props}>
                <Layout {...rest} />
            </Element>
        ) : null;
    }
}

BannerElement.propTypes = {
    layout: PropTypes.oneOf(['full_width', 'half_width', 'minimun_width']),
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    content: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    image: PropTypes.string,
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    isEnable: PropTypes.bool
};

export default BannerElement;
