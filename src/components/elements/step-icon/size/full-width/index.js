import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
    Root,
    RootContainer,
    WrapList,
    WrapItem,
    SectionTitle,
    Heading,
    Description,
    Thumbnail,
    HeadingItem
} from './styled';

class LayoutContent extends PureComponent {
    static displayName = 'FullWidth';

    render() {
        const {
            idSection,
            headingTitle,
            subHeading,
            stepIcon1,
            stepIcon2,
            stepIcon3,
            stepIcon4,
            stepIcon5
        } = this.props;
        return (
            <Root id={idSection}>
                <RootContainer>
                    <SectionTitle>
                        <Heading>{headingTitle}</Heading>
                        <Description dangerouslySetInnerHTML={{ __html: subHeading }} />
                    </SectionTitle>

                    <WrapList>
                        {(!!_.trim(_.get(stepIcon1, 'image')) === true ||
                            !!_.trim(_.get(stepIcon1, 'text')) === true) && (
                            <WrapItem>
                                {!!_.trim(_.get(stepIcon1, 'image')) === true && (
                                    <Thumbnail>
                                        <img
                                            src={_.get(stepIcon1, 'image', null)}
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </Thumbnail>
                                )}

                                <HeadingItem>{_.get(stepIcon1, 'text', '')}</HeadingItem>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(stepIcon2, 'image')) === true ||
                            !!_.trim(_.get(stepIcon2, 'text')) === true) && (
                            <WrapItem>
                                {!!_.trim(_.get(stepIcon2, 'image')) === true && (
                                    <Thumbnail>
                                        <img
                                            src={_.get(stepIcon2, 'image', null)}
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </Thumbnail>
                                )}

                                <HeadingItem>{_.get(stepIcon2, 'text')}</HeadingItem>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(stepIcon3, 'image')) === true ||
                            !!_.trim(_.get(stepIcon3, 'text')) === true) && (
                            <WrapItem>
                                {!!_.trim(_.get(stepIcon3, 'image')) === true && (
                                    <Thumbnail>
                                        <img
                                            src={_.get(stepIcon3, 'image', null)}
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </Thumbnail>
                                )}

                                <HeadingItem>{_.get(stepIcon3, 'text')}</HeadingItem>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(stepIcon4, 'image')) === true ||
                            !!_.trim(_.get(stepIcon4, 'text')) === true) && (
                            <WrapItem>
                                {!!_.trim(_.get(stepIcon4, 'image')) === true && (
                                    <Thumbnail>
                                        <img
                                            src={_.get(stepIcon4, 'image', null)}
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </Thumbnail>
                                )}

                                <HeadingItem>{_.get(stepIcon4, 'text')}</HeadingItem>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(stepIcon5, 'image')) === true ||
                            !!_.trim(_.get(stepIcon5, 'text')) === true) && (
                            <WrapItem>
                                {!!_.trim(_.get(stepIcon5, 'image')) === true && (
                                    <Thumbnail>
                                        <img
                                            src={_.get(stepIcon5, 'image', null)}
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </Thumbnail>
                                )}

                                <HeadingItem>{_.get(stepIcon5, 'text')}</HeadingItem>
                            </WrapItem>
                        )}
                    </WrapList>
                </RootContainer>
            </Root>
        );
    }
}

LayoutContent.propTypes = {
    idSection: PropTypes.string,
    headingTitle: PropTypes.string,
    subHeading: PropTypes.string,
    stepIcon1: PropTypes.object,
    stepIcon2: PropTypes.object,
    stepIcon3: PropTypes.object,
    stepIcon4: PropTypes.object,
    stepIcon5: PropTypes.object
};

export default LayoutContent;
