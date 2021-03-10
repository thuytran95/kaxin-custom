import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from './../../Link';
import play from './../../images/ic_play.png';
import logo from './../../images/logo.png';
import _ from 'lodash';
import {
    Root,
    RootContainer,
    SectionText,
    Heading1,
    Heading2,
    Heading3,
    WrapList,
    WrapItem,
    WrapButtons,
    WrapHeader,
    WrapInner,
    Logo,
    ActionLink
} from './styled';

class LayoutContent extends PureComponent {
    static displayName = 'HalfWidth';

    render() {
        const {
            idSection,
            heading1,
            heading2,
            heading3,
            backgroundImage,
            staticIcon1,
            staticIcon2,
            staticIcon3,
            linkSignUp,
            linkAffiliate,
            linkLogo,
            textLink1,
            linkTab1,
            textLink2,
            linkTab2,
            textLink3,
            linkTab3
        } = this.props;
        return (
            <Root
                id={idSection}
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
                <WrapHeader>
                    <RootContainer>
                        <WrapInner>
                            {!!_.trim(_.get(linkLogo, 'link', '')) === true && (
                                <Logo>
                                    <Link {...linkLogo}>
                                        <img src={logo} alt="Công ty sách Kaixin – Knowlege sharing" />
                                    </Link>
                                </Logo>
                            )}
                            {(!!_.trim(textLink1) === true ||
                                !!_.trim(textLink2) === true ||
                                !!_.trim(textLink3) === true) && (
                                <ul>
                                    {!!_.trim(textLink1) === true && (
                                        <li className="active">
                                            <Link {...linkTab1}>{textLink1}</Link>
                                        </li>
                                    )}
                                    {!!_.trim(textLink2) === true && (
                                        <li>
                                            <Link {...linkTab2}>{textLink2}</Link>
                                        </li>
                                    )}
                                    {!!_.trim(textLink3) === true && (
                                        <li>
                                            <Link {...linkTab3}>{textLink3}</Link>
                                        </li>
                                    )}
                                </ul>
                            )}

                            {!!_.trim(_.get(linkSignUp, 'link', '')) === true && (
                                <ActionLink>
                                    <Link {...linkSignUp}>Đăng ký ngay</Link>
                                </ActionLink>
                            )}
                        </WrapInner>
                    </RootContainer>
                </WrapHeader>
                <RootContainer>
                    <SectionText>
                        <Heading1 dangerouslySetInnerHTML={{ __html: heading1 }} />
                        <Heading2 dangerouslySetInnerHTML={{ __html: heading2 }} />
                        <Heading3 dangerouslySetInnerHTML={{ __html: heading3 }} />
                    </SectionText>
                    <WrapButtons>
                        {!!_.trim(_.get(linkSignUp, 'link')) === true && <Link {...linkSignUp}>Đăng ký ngay</Link>}
                        {!!_.trim(_.get(linkAffiliate, 'link')) === true && (
                            <Link {...linkAffiliate}>
                                <img src={play} alt="Play" /> affiliate là gì?
                            </Link>
                        )}
                    </WrapButtons>
                    <WrapList>
                        {(!!_.trim(_.get(staticIcon1, 'image')) === true ||
                            !!_.trim(_.get(staticIcon1, 'text')) === true) && (
                            <WrapItem>
                                <img src={_.get(staticIcon1, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />

                                <h4>{_.get(staticIcon1, 'text')}</h4>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(staticIcon2, 'image')) === true ||
                            !!_.trim(_.get(staticIcon2, 'text')) === true) && (
                            <WrapItem>
                                <img src={_.get(staticIcon2, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />

                                <h4>{_.get(staticIcon2, 'text')}</h4>
                            </WrapItem>
                        )}
                        {(!!_.trim(_.get(staticIcon3, 'image')) === true ||
                            !!_.trim(_.get(staticIcon3, 'text')) === true) && (
                            <WrapItem>
                                <img src={_.get(staticIcon3, 'image')} alt="Công ty sách Kaixin – Knowlege sharing" />

                                <h4>{_.get(staticIcon3, 'text')}</h4>
                            </WrapItem>
                        )}
                    </WrapList>
                </RootContainer>
            </Root>
        );
    }
}

LayoutContent.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
    backgroundImage: PropTypes.string,
    idSection: PropTypes.string,
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    heading3: PropTypes.string,
    staticIcon1: PropTypes.object,
    staticIcon2: PropTypes.object,
    staticIcon3: PropTypes.object,
    linkSignUp: PropTypes.object,
    linkAffiliate: PropTypes.object,
    linkLogo: PropTypes.object,
    linkTab1: PropTypes.object,
    linkTab2: PropTypes.object,
    linkTab3: PropTypes.object,
    textLink1: PropTypes.string,
    textLink2: PropTypes.string,
    textLink3: PropTypes.string
};

export default LayoutContent;
