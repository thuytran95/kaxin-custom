import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import _ from 'lodash';
import UserProfileContainer from 'src/shared/components/Account/Teacher/Profile/index';

class TeacherComponent extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'auth',
            requireAuth: true,
            title: 'Thông tin của tôi'
        };
    }
    state = {
        cities: []
    };
    componentDidMount() {
        const { authActions } = this.props;
        authActions.getListCity().then(res => {
            this.setState({ cities: _.get(res, 'data.data', []) });
        });
    }
    render() {
        const { cities } = this.state;
        const { title, authInfo, authActions, ...remains } = this.props;
        return (
            <AccountPageLayout title={title} {...remains}>
                <UserProfileContainer authInfo={authInfo} authActions={authActions} cities={cities} />
            </AccountPageLayout>
        );
    }
}

TeacherComponent.defaultProps = {
    authInfo: {}
};

TeacherComponent.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    statusCode: PropTypes.number,
    hasError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    history: PropTypes.object,
    cities: PropTypes.array
};

const mapStateToProps = state => {
    const { auth, user } = state;
    return { authInfo: auth, user };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherComponent);
