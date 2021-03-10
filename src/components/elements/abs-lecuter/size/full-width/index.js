import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from './../../Link';
import _ from 'lodash';
import { Root, RootContainer, RootRow, Left, Right, HideText, Heading, Description, BoxText, Button } from './styled';

class LayoutContent extends PureComponent {
    static displayName = 'FullWidth';

    render() {
        const { overlayHeading, headingTitle, linkButton, description, nameButton, bannerImage } = this.props;
        return (
            <Root>
                <RootContainer>
                    <RootRow>
                        <Left bannerImage={bannerImage}>
                            <HideText dangerouslySetInnerHTML={{ __html: overlayHeading }} />
                        </Left>
                        <Right>
                            <BoxText>
                                <Heading dangerouslySetInnerHTML={{ __html: headingTitle }} />
                                <Description dangerouslySetInnerHTML={{ __html: description }} />
                                <Button>
                                    {!!_.trim(nameButton) === true && <Link {...linkButton}>{nameButton}</Link>}
                                </Button>
                            </BoxText>
                        </Right>
                    </RootRow>
                </RootContainer>
            </Root>
        );
    }
}

LayoutContent.propTypes = {
    bannerImage: PropTypes.string,
    headingTitle: PropTypes.string,
    linkButton: PropTypes.object,
    description: PropTypes.string,
    overlayHeading: PropTypes.string,
    nameButton: PropTypes.string
};

export default LayoutContent;
