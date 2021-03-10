import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Root,
    RootContainer,
    RootRow,
    ItemWhy,
    SectionTitle,
    Heading,
    Description,
    HeadingItem,
    DescriptionItem
} from './styled';

class LayoutContent extends PureComponent {
    static displayName = 'FullWidth';

    render() {
        const { idSection, headingTitle, subHeading, ReasonIcon1, ReasonIcon2, ReasonIcon3, ReasonIcon4 } = this.props;
        return (
            <Root id={idSection}>
                <RootContainer>
                    <SectionTitle>
                        <Heading>{headingTitle}</Heading>
                        <Description dangerouslySetInnerHTML={{ __html: subHeading }} />
                    </SectionTitle>

                    <RootRow>
                        {!_.isEmpty(ReasonIcon1) && (
                            <ItemWhy>
                                <img src={_.get(ReasonIcon1, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />
                                <HeadingItem>{_.get(ReasonIcon1, 'text')}</HeadingItem>
                                <DescriptionItem dangerouslySetInnerHTML={{ __html: _.get(ReasonIcon1, 'content') }} />
                            </ItemWhy>
                        )}
                        {!_.isEmpty(ReasonIcon2) && (
                            <ItemWhy>
                                <img src={_.get(ReasonIcon2, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />
                                <HeadingItem>{_.get(ReasonIcon2, 'text')}</HeadingItem>
                                <DescriptionItem dangerouslySetInnerHTML={{ __html: _.get(ReasonIcon2, 'content') }} />
                            </ItemWhy>
                        )}
                        {!_.isEmpty(ReasonIcon3) && (
                            <ItemWhy>
                                <img src={_.get(ReasonIcon3, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />
                                <HeadingItem>{_.get(ReasonIcon3, 'text')}</HeadingItem>
                                <DescriptionItem dangerouslySetInnerHTML={{ __html: _.get(ReasonIcon3, 'content') }} />
                            </ItemWhy>
                        )}
                        {!_.isEmpty(ReasonIcon4) && (
                            <ItemWhy>
                                <img src={_.get(ReasonIcon4, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />
                                <HeadingItem>{_.get(ReasonIcon4, 'text')}</HeadingItem>
                                <DescriptionItem dangerouslySetInnerHTML={{ __html: _.get(ReasonIcon4, 'content') }} />
                            </ItemWhy>
                        )}
                    </RootRow>
                </RootContainer>
            </Root>
        );
    }
}

LayoutContent.propTypes = {
    idSection: PropTypes.string,
    headingTitle: PropTypes.string,
    subHeading: PropTypes.string,
    ReasonIcon1: PropTypes.object,
    ReasonIcon2: PropTypes.object,
    ReasonIcon3: PropTypes.object,
    ReasonIcon4: PropTypes.object
};

export default LayoutContent;
