import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import Helmet from 'react-helmet';
import _ from 'lodash';
import SignUpContainer from 'src/shared/components/Account/Partner/SignUp/index';

class SignUpPartner extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'empty',
            requireAuth: true,
            title: 'Đăng ký làm cộng tác viên'
        };
    }
    state = {
        cities: []
    };
    componentWillMount() {
        const { authActions } = this.props;
    
        authActions.getListCity().then(res => {
            this.setState({ cities: _.get(res, 'data.data', []) });
        });
    }
    render() {
        const { cities } = this.state;
        const { title, authInfo, authActions } = this.props;
        return (
            <Fragment>
                <Helmet title={`${title}`} meta={[{ property: 'og:title', content: `${title}` }]} />
                <SignUpContainer authInfo={authInfo} authActions={authActions} cities={cities} />
            </Fragment>
        );
    }
}

SignUpPartner.defaultProps = {
    authInfo: {}
};

SignUpPartner.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    title: PropTypes.string.isRequired,
    cities: PropTypes.array
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPartner);
