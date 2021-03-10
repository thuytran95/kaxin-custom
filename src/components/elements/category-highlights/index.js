import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
import { CategoryLink } from 'src/shared/components/Link';

// import googlePlay from './images/android.png';
// import appStore from './images/ios.png';

import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';

import {
    RootContent,
    Root,
    Heading,
    DivCategory,
    Content,
    TopItem,
    BotItem,
    BotItemh4,
    BotItemp,
    CateLink
} from './styled';

class CategoryHighlightsElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataCateHighlights: []
        };
    }

    static defaultProps = {
        headingContent: 'HEADING HERE',
        builder: {}
    };
    static propsSchema = propsSchema;

    static settings = settings;

    componentDidMount() {
        const { data, widgetActions } = this.props;
        if (data && data.items) {
            widgetActions.listFeaturedTopic(data.items).then(data => {
                this.setState({ dataCateHighlights: data.data.rows });
            });
        }
    }
    renderCateFeatured = (item, index) => {
        return (
            <Fragment key={index}>
                <div className="col-6 col-lg-3">
                    <DivCategory>
                        <TopItem backgroundImageCate={item.picture}>
                            <CateLink>
                                <CategoryLink {...item} />
                            </CateLink>
                        </TopItem>
                        <BotItem>
                            <BotItemh4>
                                <CategoryLink {...item} />
                            </BotItemh4>
                            <BotItemp>
                                <b>{item.totalCourses ? item.totalCourses : 0}</b> khoá học
                            </BotItemp>
                        </BotItem>
                    </DivCategory>
                </div>
            </Fragment>
        );
    };

    render() {
        const { dataCateHighlights } = this.state;
        const { Element, builder, headingContent, backgroundImage } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        return (
            <Element {...props}>
                <Root backgroundImage={backgroundImage}>
                    <RootContent>
                        <Content>
                            <Heading
                                dangerouslySetInnerHTML={{
                                    __html: headingContent
                                }}
                            />
                            <div className="row">
                                {!_.isEmpty(dataCateHighlights)
                                    ? dataCateHighlights.map((item, index) => this.renderCateFeatured(item, index))
                                    : null}
                            </div>
                        </Content>
                    </RootContent>
                </Root>
            </Element>
        );
    }
}

CategoryHighlightsElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    content: PropTypes.string,
    headingContent: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHighlightsElement);
