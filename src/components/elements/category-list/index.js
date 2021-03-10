import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
// import googlePlay from './images/android.png';
// import appStore from './images/ios.png';
import { CategoryLink } from 'src/shared/components/Link';

import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import Link from './Link';

import {
    RootContent,
    LeftContent,
    RightContent,
    Root,
    Heading,
    Description,
    Text,
    DivCategory,
    TextBottom,
    IconCate,
    Img
} from './styled';

class CategoryListElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataFeaturedTopic: []
        };
    }

    static defaultProps = {
        content: 'Lorem ipsum dolor sit amet',
        headingContent: 'HEADING HERE',
        titleLink: 'CALL TO ACTION'
        // link: '#'
    };
    static propsSchema = propsSchema;

    static settings = settings;

    componentDidMount() {
        const { data, widgetActions } = this.props;
        if (data && data.items) {
            widgetActions.listFeaturedTopic(data.items).then(data => {
                this.setState({ dataFeaturedTopic: data.data.rows });
            });
        }
    }
    renderCateFeatured = (item, index) => {
        return (
            <Fragment key={index}>
                <div className="col-xs-6 col-md-3">
                    <DivCategory>
                        <IconCate>{item.icon ? <Img src={item.icon} /> : null}</IconCate>
                        <TextBottom>
                            <CategoryLink {...item} />
                        </TextBottom>
                    </DivCategory>
                </div>
            </Fragment>
        );
    };

    render() {
        const { dataFeaturedTopic } = this.state;
        const { Element, builder, content, link, titleLink, headingContent } = this.props;
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
                            <Heading
                                dangerouslySetInnerHTML={{
                                    __html: headingContent
                                }}
                            />
                            <Description
                                dangerouslySetInnerHTML={{
                                    __html: content
                                }}
                            />
                            <Link {...link}>
                                <Text
                                    dangerouslySetInnerHTML={{
                                        __html: titleLink
                                    }}
                                />
                            </Link>
                            {/* {!!_.trim(_.get(linkAndroid, 'link')) === true && (
                                    <Link {...linkAndroid}>
                                        <img src={googlePlay} alt="Google Play" />
                                    </Link>
                                )}
                                {!!_.trim(_.get(linkIos, 'link')) === true && (

                                )} */}
                        </LeftContent>
                        <RightContent>
                            <div className="row">
                                {!_.isEmpty(dataFeaturedTopic)
                                    ? dataFeaturedTopic.map((item, index) => this.renderCateFeatured(item, index))
                                    : null}
                            </div>
                        </RightContent>
                    </RootContent>
                </Root>
            </Element>
        );
    }
}

CategoryListElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    content: PropTypes.string,
    headingContent: PropTypes.string,
    titleLink: PropTypes.string,
    link: PropTypes.object,
    backgroundImage: PropTypes.string,
    data: PropTypes.object,
    widgetActions: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    const { widget } = state;
    return {
        widget
    };
};

const mapDispatchToProps = dispatch => {
    return {
        widgetActions: bindActionCreators(actions.widgetActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListElement);
