import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
//import FormElement from './Form';
import Link from './Link';
import {
    Root,
    RootContainer,
    RootRow,
    SectionTitle,
    Heading,
    ColumnLeft,
    //ColumnRight,
    TitleBox,
    DescriptionBox,
    Text,
    Icon,
    Content,
    TitleItem,
    DescriptionItem,
    SignUp
} from './styled';

class SignUpAffiliateElement extends PureComponent {
    static defaultProps = {
        idSection: 'sectionForm',
        headingTitle: 'Đăng ký AFFILIATE',
        titleBox: 'Yêu cầu cho Affiliate',
        descriptionBox:
            'Bạn tự tin mình đáp ứng được những yêu cầu dưới? Bạn chỉ cần điền thông tin vào form bên phải. Chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.'
    };
    static propsSchema = propsSchema;

    static settings = settings;

    render() {
        const {
            Element,
            builder,
            idSection,
            headingTitle,
            titleBox,
            descriptionBox,
            NeedIcon1,
            NeedIcon2,
            NeedIcon3,
            linkSignUp
        } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        return (
            <Element {...props}>
                <Root id={idSection}>
                    <RootContainer>
                        <SectionTitle>
                            <Heading>{headingTitle}</Heading>
                        </SectionTitle>
                        <RootRow>
                            <ColumnLeft>
                                <Text>
                                    <TitleBox>{titleBox}</TitleBox>
                                    <DescriptionBox dangerouslySetInnerHTML={{ __html: descriptionBox }} />
                                </Text>
                                <ul>
                                    {!_.isEmpty(NeedIcon1) && (
                                        <li>
                                            <Icon>
                                                <img
                                                    src={_.get(NeedIcon1, 'image', '')}
                                                    alt="Công ty sách MCBooks – Knowlege sharing"
                                                />
                                            </Icon>
                                            <Content>
                                                <TitleItem
                                                    dangerouslySetInnerHTML={{ __html: _.get(NeedIcon1, 'text', '') }}
                                                />
                                                <DescriptionItem
                                                    dangerouslySetInnerHTML={{
                                                        __html: _.get(NeedIcon1, 'content', '')
                                                    }}
                                                />
                                            </Content>
                                        </li>
                                    )}
                                    {!_.isEmpty(NeedIcon2) && (
                                        <li>
                                            <Icon>
                                                <img
                                                    src={_.get(NeedIcon2, 'image', '')}
                                                    alt="Công ty sách MCBooks – Knowlege sharing"
                                                />
                                            </Icon>
                                            <Content>
                                                <TitleItem
                                                    dangerouslySetInnerHTML={{ __html: _.get(NeedIcon2, 'text', '') }}
                                                />
                                                <DescriptionItem
                                                    dangerouslySetInnerHTML={{
                                                        __html: _.get(NeedIcon2, 'content', '')
                                                    }}
                                                />
                                            </Content>
                                        </li>
                                    )}
                                    {!_.isEmpty(NeedIcon3) && (
                                        <li>
                                            <Icon>
                                                <img
                                                    src={_.get(NeedIcon3, 'image', '')}
                                                    alt="Công ty sách MCBooks – Knowlege sharing"
                                                />
                                            </Icon>
                                            <Content>
                                                <TitleItem
                                                    dangerouslySetInnerHTML={{ __html: _.get(NeedIcon3, 'text', '') }}
                                                />
                                                <DescriptionItem
                                                    dangerouslySetInnerHTML={{
                                                        __html: _.get(NeedIcon3, 'content', '')
                                                    }}
                                                />
                                            </Content>
                                        </li>
                                    )}
                                </ul>
                                <SignUp>
                                    {!!_.trim(_.get(linkSignUp, 'link', '')) === true && (
                                        <Link {...linkSignUp}>Đăng ký ngay</Link>
                                    )}
                                </SignUp>
                            </ColumnLeft>
                            {/* <ColumnRight>
                                <FormElement />
                            </ColumnRight> */}
                        </RootRow>
                    </RootContainer>
                </Root>
            </Element>
        );
    }
}

SignUpAffiliateElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    idSection: PropTypes.string,
    headingTitle: PropTypes.string,
    titleBox: PropTypes.string,
    descriptionBox: PropTypes.string,
    NeedIcon1: PropTypes.object,
    NeedIcon2: PropTypes.object,
    NeedIcon3: PropTypes.object,
    linkSignUp: PropTypes.object
};

export default SignUpAffiliateElement;
