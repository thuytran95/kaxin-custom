/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import Keycloak from 'keycloak-js';
import ConnectedLocaleProvider from 'src/containers/ConnectedLocaleProvider';
import Request from 'src/helpers/Request';
import * as Cookie from 'src/helpers/Cookie';
import { actions } from 'src/redux-utils';
import initStore from 'src/store';
import { redirect } from 'src/helpers/Common';
import layouts, { defaultlayout } from 'src/shared/layout';
import Router from 'next/router';
import { initGA, logPageView } from 'src/helpers/analytics';

moment.locale('vi');

const connect = (...args) => {
    return OwnComponent => {
        class PageWrapper extends Component {
            constructor() {
                super();
                this.state = {
                    isSuccess: false
                };
            }
            static async getInitialProps(ctx) {
                const { store, req } = ctx;
                const { dispatch, getState } = store;
                Request.setupToken(req);
                // Request.setupInterceptors(store);

                const { authActions, commonActions } = mapDispatchToProps(dispatch);
                if (req) {
                    Helmet.renderStatic();
                    try {
                        await Promise.all([commonActions.getSEO()]);
                    } catch (err) {
                        //
                    }
                    if (!Cookie.getToken(req)) {
                        // req.session.user = null;
                    } else {
                        // if (req.session.user) {
                        //     authActions.setUserLogin(req.session.user);
                        // } else {
                        try {
                            await Promise.all([authActions.me()]);
                        } catch (err) {
                            //
                        }
                    }
                }

                const { auth: { isAuthenticated } } = getState();
                const pageProps = OwnComponent.getInitialProps ? await OwnComponent.getInitialProps(ctx) : {};
                //const { requireAuth = false, redirectTo = '' } = pageProps;
                const { requireAuth = false } = pageProps;

                if (requireAuth) {
                    if (!isAuthenticated) {
                        redirect(`/dang-nhap`);
                    }
                }

                return { pageProps: { ...pageProps } };
            }

            switchLayout = () => {
                const { pageProps: { layout } } = this.props;
                return _.get(layouts, layout, defaultlayout);
            };

            async componentDidMount() {
                const { authActions, common: { seoCommon = {} } } = this.props;
                // const auth = Keycloak('/../keycloak.json');
                const { kc } = require('src/helpers/Keycloak');
                const authenticated = await kc.initAsync();
                if (authenticated) {
                    Request.setToken(kc.token);
                    Request.setRefreshToken(kc.refreshToken);
                    authActions.me().then(res => {});
                }
                const codeGA = _.get(seoCommon, 'code_google_analytics');
                if (codeGA) {
                    initGA(_.get(seoCommon, 'code_google_analytics'));
                    logPageView();
                    Router.router.events.on('routeChangeComplete', logPageView);
                }
            }
            render() {
                const { pageProps, ...props } = this.props;
                const Layout = this.switchLayout();
                return (
                    <ConnectedLocaleProvider>
                        <Layout>
                            <OwnComponent {...props} {...pageProps} />
                        </Layout>
                    </ConnectedLocaleProvider>
                );
            }
        }

        PageWrapper.propTypes = {
            pageProps: PropTypes.object,
            common: PropTypes.object,
            authActions: PropTypes.object.isRequired,
            commonActions: PropTypes.object.isRequired
        };
        const connectWrap = reduxConnect(mapStateToProps, mapDispatchToProps)(PageWrapper);
        return withRedux(initStore, ...args)(connectWrap);
    };
};

const mapStateToProps = state => {
    const { common } = state;
    return { common };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};

export default connect;

export { connect };
