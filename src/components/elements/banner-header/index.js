import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';

import { Root, RootContainer, WrapInner, BoxText, Heading, Code, Percent } from './styled';

class BannerHeaderElement extends PureComponent {
    static defaultProps = {
        headingTitle: 'GIẢI PHÓNG MIỀN NAM',
        subHeading: 'CHÀO MỪNG NGÀY',
        codeString: 'Nhập mã <b>UIC7HWYW7</b>',
        numberPercent: '-40%',
        backgroundImage: 'http://103.28.38.94:28004/files/exercises/file-1533198414219.png'
    };
    static propsSchema = propsSchema;

    static settings = settings;

    render() {
        const { Element, builder, headingTitle, subHeading, codeString, numberPercent, backgroundImage } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };

        return (
            <Element {...props}>
                <Root
                    style={{
                        backgroundImage: `url(${backgroundImage})`
                    }}
                >
                    <RootContainer>
                        <WrapInner>
                            <BoxText>
                                <span>{subHeading}</span>
                                <Code dangerouslySetInnerHTML={{ __html: codeString }} />
                            </BoxText>
                            <Heading>{headingTitle}</Heading>
                            <Percent>{numberPercent}</Percent>
                        </WrapInner>
                    </RootContainer>
                </Root>
            </Element>
        );
    }
}

BannerHeaderElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    headingTitle: PropTypes.string,
    subHeading: PropTypes.string,
    codeString: PropTypes.string,
    backgroundImage: PropTypes.string,
    numberPercent: PropTypes.string
};

export default BannerHeaderElement;
