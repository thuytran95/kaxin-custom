import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Request from 'src/helpers/Request';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { redirect } from 'src/helpers/Common';
import { Cube as Loading } from 'src/shared/components/loading';

import { actions } from 'src/redux-utils';

class SSOPage extends PureComponent {
    static async getInitialProps(context) {
        return {
            layout: 'empty'
        };
    }

    // async componentDidMount() {
    //     const { authActions } = this.props;
    //     const { kc } = await require('src/helpers/Keycloak');
    //     kc
    //         .init()
    //         .success(function(authenticated) {
    //             if (authenticated) {
    //                 Request.setToken(kc.token);
    //                 Request.setRefreshToken(kc.refreshToken);
    //                 authActions.me().then(res => {});
    //             }
    //         })
    //         .error(function() {});
    // }

    async componentDidMount() {
        const { authActions, url } = this.props;
        const { kc } = require('src/helpers/Keycloak');
        console.log(kc);
        const authentication = await kc.initAsync({ onLoad: 'login-required' });
        if (authentication) {
            Request.setToken(kc.token);
            Request.setRefreshToken(kc.refreshToken);
            authActions.me().then(res => {
                
                redirect(url.query.redirect || '/');
                //redirect(window.history.back() || '/');
            });
        }
    }

    render() {
        return <Loading loading />;
    }
}

SSOPage.propTypes = {
    authActions: PropTypes.object.isRequired,
    url: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };  
};

export default connect(null, mapDispatchToProps)(SSOPage);
