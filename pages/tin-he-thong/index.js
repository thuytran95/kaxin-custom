import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../tai-khoan/layout';
import NotifyComponent from 'src/shared/components/Account/Notify/index';

class NotifyPage extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { commonActions } = mapDispatchToProps(store.dispatch);

        try {
            const params = {
                limit: 20,
                start: 0,
                filter: JSON.stringify([{ operator: 'eq', value: null, property: 'sendTo' }]),
                sort: JSON.stringify([{ property: 'created_at', direction: 'DESC' }])
            };
            await commonActions.getManualNotice({ ...params });
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Thông báo hệ thống'
            };
        } catch (e) {
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Thông báo hệ thống'
            };
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pagination: {
                    current: 1,
                    perPage: 20
                }
            }
        };
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { commonActions } = this.props;
        const { pagination } = this.state.params;
        commonActions.getManualNotice({
            sort: JSON.stringify([{ property: 'created_at', direction: 'DESC' }]),
            filter: JSON.stringify([{ operator: 'eq', value: null, property: 'sendTo' }]),
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage
        });
    };
    readMe = data => {};
    readAllNotice = () => {};
    render() {
        const { title, common: { maNotice = {} }, ...remains } = this.props;
        const { params } = this.state;
        return (
            <AccountPageLayout title={title} {...remains}>
                <NotifyComponent
                    data={maNotice.rows}
                    count={maNotice.count}
                    updateParams={this.updateParams}
                    pagination={params.pagination}
                    readMe={this.readMe}
                    readAllNotice={this.readAllNotice}
                    type="manual"
                />
            </AccountPageLayout>
        );
    }
}

NotifyPage.defaultProps = {};

NotifyPage.propTypes = {
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    commonActions: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, user, common } = state;
    return { authInfo: auth, user, common };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyPage);
