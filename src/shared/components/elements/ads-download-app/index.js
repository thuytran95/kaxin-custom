import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
import googlePlay from './images/android.png';
import appStore from './images/ios.png';
import Link from './Link';

import { RootContent, LeftContent, RightContent, Root, Heading, Description } from './styled';

class AdsDownloadAppElement extends PureComponent {
    static defaultProps = {
        content: ''
    };
    static propsSchema = propsSchema;

    static settings = settings;

    render() {
        const { Element, builder, content, linkIos, linkAndroid, backgroundImage } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };

        return (
            <Element {...props}>
                <Root>
                    <RootContent>
                        <LeftContent>
                            <Heading>TẢI APP ĐỌC SÁCH</Heading>
                            <Description dangerouslySetInnerHTML={{ __html: content }} />
                            <div>
                                {!!_.trim(_.get(linkAndroid, 'link')) === true && (
                                    <Link {...linkAndroid}>
                                        <img src={googlePlay} alt="Google Play" />
                                    </Link>
                                )}
                                {!!_.trim(_.get(linkIos, 'link')) === true && (
                                    <Link {...linkIos}>
                                        <img src={appStore} alt="App Store" />
                                    </Link>
                                )}
                            </div>
                        </LeftContent>
                        <RightContent>
                            {!!backgroundImage === true && <img src={backgroundImage} alt="Cover" />}
                        </RightContent>
                    </RootContent>
                </Root>
            </Element>
        );
    }
}

AdsDownloadAppElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object.isRequired,
    content: PropTypes.string,
    linkIos: PropTypes.object,
    linkAndroid: PropTypes.object,
    backgroundImage: PropTypes.string
};

export default AdsDownloadAppElement;
