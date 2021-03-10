import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';

import { Root, Heading } from './styled';

class BannerImageElement extends PureComponent {
    static defaultProps = {
        backgroundImage: ''
    };
    static propsSchema = propsSchema;

    static settings = settings;

    render() {
        const { Element, builder, backgroundImage } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };

        return (
            <Element {...props}>
                <Root>
                    {!!backgroundImage === false && <Heading>Tải ảnh</Heading>}
                    {!!backgroundImage === true && <img src={backgroundImage} alt="banner" />}
                </Root>
            </Element>
        );
    }
}

BannerImageElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    backgroundImage: PropTypes.string
};

export default BannerImageElement;
