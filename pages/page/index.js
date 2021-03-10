import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import PageBuilderLayout from './PageBuilderLayout';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { BASE_LINK_NL } from 'src/constants/config';

// import layout from 'components/layouts';

class PageBuilderLayoutContainer extends PureComponent {
    static async getInitialProps(context) {
        const { store, url, query } = context;
        const { pageBuilderActions } = mapDispatchToProps(store.dispatch);
        try {
            const data = await pageBuilderActions.getPageBuilderDataUrl(query.slug);
            if (data.rows[0].fullWidth) {
                return {
                    layout: 'empty',
                    title: 'page build',
                    data: _.get(data, 'rows[0]', {}),
                    asPath: _.get(url, 'asPath', '/')
                };
            } else {
                return {
                    title: 'page build',
                    data: _.get(data, 'rows[0]', {}),
                    asPath: _.get(url, 'asPath', '/')
                };
            }
        } catch (err) {
            return { layout: 'empty', data: {}, asPath: _.get(url, 'asPath', '/') };
        }
        // Get page data from here
    }
    render() {
        const { data, asPath } = this.props;
        return (
            <Fragment>
                <Helmet
                    title={_.get(data, 'title')}
                    meta={[
                        {
                            name: 'description',
                            content: _.trim(_.get(data, 'metaDescription'))
                        },
                        {
                            name: 'keywords',
                            content: _.get(data, 'metaKeywords')
                        },
                        {
                            property: 'og:title',
                            content: _.get(data, 'title')
                        },
                        {
                            property: 'og:image',
                            content: _.get(data, 'featuredImage')
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
                "name" : "${_.get(data, 'title')}",
                "alternateName" : "${_.trim(_.get(data, 'metaDescription'))}",
                "dateModified": "",
                "url" : ""
                }`}
                    </script>
                </Helmet>
                <PageBuilderLayout />
            </Fragment>
        );
    }
}

PageBuilderLayoutContainer.defaultProps = {
    pageBuilderActions: {}
};

PageBuilderLayoutContainer.propTypes = {
    page: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    data: PropTypes.object,
    asPath: PropTypes.string
};
const mapStateToProps = state => {
    const { page, pageBuilder } = state;
    return { page, pageBuilder };
};

const mapDispatchToProps = dispatch => {
    return {
        pageBuilderActions: bindActionCreators(actions.pageBuilderActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageBuilderLayoutContainer);
