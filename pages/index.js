import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import _ from 'lodash';
import { BASE_LINK_NL } from 'src/constants/config';
// import PageBuilderLayout from './page/PageBuilderLayout';

import SlideComponent from 'src/shared/components/slide/index';
import TabHomeComponent from 'src/shared/components/HomeTabs/index';
import FeaturedTheme from 'src/shared/components/FeaturedTheme/index';
import FeaturedComment from 'src/shared/components/Comments/index';
import JoinCoimponent from 'src/shared/components/Join/index';
import LazyLoad from 'react-lazyload';

class IndexComponent extends Component {
    static async getInitialProps(context) {
        const { store, url } = context;
        const { courseActions, categoryActions } = mapDispatchToProps(store.dispatch);

        // try {
        //     await pageBuilderActions.getPageBuilderDataUrl('home');
        //     return {
        //         title: 'Home'
        //     };
        // } catch (err) {
        //     return await { title: 'Home' };
        // }

        let courseHigtLight = {},
            courseNew = {},
            coursePercent = {};
        try {
            const paramsTop = {
                filter: JSON.stringify([
                    { operator: 'eq', value: 'website', property: 'type' },
                    { operator: 'eq', value: 'true', property: 'publish' },
                    { operator: 'eq', value: '1', property: 'active' }
                ]),
                limit: 8,
                start: 0
            };
            const paramsHightlight = {
                filter: JSON.stringify([
                    { operator: 'eq', value: 'website', property: 'type' },
                    { operator: 'eq', value: 'true', property: 'highLight' },
                    { operator: 'eq', value: '1', property: 'active' }
                ]),
                limit: 4,
                start: 0
            };
            [courseHigtLight, coursePercent, courseNew] = await Promise.all([
                courseActions
                    .courseIndex({
                        start: 0,
                        limit: 10,
                        filter: JSON.stringify([
                            { operator: 'eq', value: 'true', property: 'courseHighlight' },
                            { operator: 'eq', value: '1', property: 'active' }
                        ])
                    })
                    .catch(() => ({})),
                courseActions
                    .courseSaleIndex({
                        //sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }])
                    })
                    .catch(() => ({})),
                courseActions
                    .courseIndex({
                        start: 0,
                        limit: 10,
                        filter: JSON.stringify([{ operator: 'eq', value: '1', property: 'active' }])
                    })
                    .catch(() => ({})),
                categoryActions.catTopIndex(paramsTop).catch(() => ({})),
                categoryActions.cateHightlightIndex(paramsHightlight).catch(() => ({}))
            ]);
        } catch (err) {
            //
        }
        return {
            title: 'Trang chủ',
            courseHigtLight,
            courseNew,
            coursePercent,
            asPath: _.get(url, 'asPath', '/')
        };
    }
    render() {
        const { title, courseHigtLight, courseNew, coursePercent, cartActions, authInfo, asPath } = this.props;
        const {
            category: { categoryTop = {}, categoryHighLight: { data: categoryHighLight } },
            cart,
            common: { seoCommon = {} }
        } = this.props;
        //console.log('courseNew', courseNew, 'coursePercent', coursePercent);
        return (
            <Fragment>
                <Helmet
                    title={title}
                    meta={[
                        {
                            name: 'description',
                            content: _.trim(_.get(seoCommon, 'homepage_metaDescription'))
                        },
                        {
                            name: 'keywords',
                            content: _.get(seoCommon, 'homepage_metaKeywords')
                        },
                        {
                            property: 'og:title',
                            content: title
                        },
                        {
                            property: 'og:image',
                            content: _.get(seoCommon, 'homepage_featuredImage')
                        },
                        {
                            property: 'og:image:width',
                            content: '720'
                        },
                        {
                            property: 'og:image:height',
                            content: '480'
                        }
                    ]}
                    link={[{ rel: 'canonical', href: BASE_LINK_NL + asPath }]}
                />
                <Helmet>
                    <script type="application/ld+json">
                        {`{
                "@context" : "http://schema.org",
                "@type" : "WebSite",
                "name" : "${title}",
                "alternateName" : "${_.trim(_.get(seoCommon, 'homepage_metaDescription'))}",
                "dateModified": "",
                "url" : ""
                }`}
                    </script>
                </Helmet>
                <div className="front-page">
                    <SlideComponent data={categoryTop} authInfo={authInfo} />
                    <TabHomeComponent
                        courseHigtLight={courseHigtLight}
                        courseNew={courseNew}
                        coursePercent={coursePercent}
                    />
                    <FeaturedTheme data={categoryHighLight} />
                    <LazyLoad>
                        <FeaturedComment data={coursePercent} cart={cart} cartActions={cartActions} />
                    </LazyLoad>
                    {/* <PageBuilderLayout /> */}
                    <LazyLoad>
                        <JoinCoimponent authInfo={authInfo} />
                    </LazyLoad>
                </div>
            </Fragment>
        );
    }
}

IndexComponent.defaultProps = {};

IndexComponent.propTypes = {
    title: PropTypes.string.isRequired,
    authInfo: PropTypes.object,
    category: PropTypes.object,
    common: PropTypes.object,
    courseHigtLight: PropTypes.object,
    courseNew: PropTypes.object,
    coursePercent: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    courseActions: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    asPath: PropTypes.string
};

const mapStateToProps = state => {
    const { auth, course, category, common, cart, pageBuilder } = state;
    return { authInfo: auth, course, category, common, cart, pageBuilder };
};

const mapDispatchToProps = dispatch => {
    return {
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        userActions: bindActionCreators(actions.userActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        pageBuilderActions: bindActionCreators(actions.pageBuilderActions, dispatch),
        authActions: bindActionCreators(actions.pageBuilderActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);
