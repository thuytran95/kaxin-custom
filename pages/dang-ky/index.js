import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import { redirect } from 'src/helpers/Common';
import Request from 'src/helpers/Request';

import { Cube as Loading } from 'src/shared/components/loading';
class SignUpPage extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'empty'
        };
    }
    state = {
        kc: {}
    };
    async componentDidMount() {
        const { authActions } = this.props;
        const { kc } = require('src/helpers/Keycloak');
        this.setState({ kc });
        const authentication = await kc.initAsync();
        if (authentication) {
            Request.setToken(kc.token);
            Request.setRefreshToken(kc.refreshToken);
            authActions.me().then(res => {
                redirect('/');
            });
        } else {
            const options = {};
            this.state.kc.register(options);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.authInfo.isAuthenticated !== prevProps.authInfo.isAuthenticated) {
            redirect('/');
        }
    }
    render() {
        return <Loading loading />;
    }
}

SignUpPage.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object.isRequired,
    url: PropTypes.object
};

const mapStateToProps = state => {
    const { auth } = state;
    return { authInfo: auth };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
