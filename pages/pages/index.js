import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import Error from 'next/error';
import ReactHtmlParser from 'react-html-parser';
import { BASE_LINK_NL } from 'src/constants/config';

class PageComponent extends Component {
    static async getInitialProps(context) {
        const { store, url, query } = context;
        const { pageActions } = mapDispatchToProps(store.dispatch);

        try {
            const filter = JSON.stringify([
                { operator: 'eq', value: 'website', property: 'platform' },
                { operator: 'eq', value: query.route, property: 'route' }
            ]);
            const { data } = await pageActions.pageInfo({ filter });

            return {
                pageInfo: data,
                asPath: _.get(url, 'asPath', '/')
            };
        } catch (err) {
            return { pageInfo: {}, statusCode: 404, asPath: _.get(url, 'asPath', '/') };
        }
    }
    render() {
        const { statusCode, page: { pageInfo }, asPath } = this.props;
        const item = _.get(pageInfo, 'data.rows[0]', {});
        if (statusCode) {
            return <Error statusCode={statusCode} />;
        }
        //console.log(item);
        return (
            <Fragment>
                <Helmet
                    title={_.get(item, 'title')}
                    meta={[
                        {
                            name: 'description',
                            content: _.trim(_.get(item, 'metaDescription'))
                        },
                        {
                            name: 'keywords',
                            content: _.get(item, 'metaKeywords')
                        },
                        {
                            property: 'og:title',
                            content: _.get(item, 'title')
                        },
                        {
                            property: 'og:image',
                            content: _.get(item, 'featuredImage')
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
                "name" : "${_.get(item, 'title')}",
                "alternateName" : "${_.trim(_.get(item, 'metaDescription'))}",
                "dateModified": "",
                "url" : ""
                }`}
                    </script>
                </Helmet>
                <div className={`${style.pageWrapper}`}>
                    <div className={style.headerTitlePage}>
                        <div className="container">
                            <h1> {_.get(item, 'title', '')} </h1>
                        </div>
                    </div>
                    <div className={`container`}>
                        <div className={style.contentWrapper}> {ReactHtmlParser(_.get(item, 'content', ''))} </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
PageComponent.defaultProps = {
    authInfo: {},
    authActions: {},
    pageActions: {}
};

PageComponent.propTypes = {
    statusCode: PropTypes.number,
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    page: PropTypes.object,
    pageActions: PropTypes.object,
    asPath: PropTypes.string
};

const mapStateToProps = state => {
    const { auth, page } = state;
    return { authInfo: auth, page };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        pageActions: bindActionCreators(actions.pageActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
