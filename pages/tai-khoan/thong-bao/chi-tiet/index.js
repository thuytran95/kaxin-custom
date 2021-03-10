import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import NotifyDetailComponent from 'src/shared/components/Account/Notify/detail/index';

import AccountPageLayout from '../../layout';

class NotifyDetailPage extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { commonActions } = mapDispatchToProps(store.dispatch);

        try {
            const params = {
                limit: 1,
                start: 0,
                filter: JSON.stringify([{ operator: 'eq', value: query.id, property: 'dataId' }])
            };
            await commonActions.getMyNoticeDetail({ ...params });
            return {
                requireAuth: true,
                title: 'Chi tiết thông báo'
            };
        } catch (e) {
            return {
                requireAuth: true,
                title: 'Chi tiết thông báo'
            };
        }
    }
    render() {
        const { title, common: { myNoticeDetail = {} }, ...remains } = this.props;
        return (
            <Fragment>
                <AccountPageLayout title={title} {...remains}>
                    <NotifyDetailComponent data={myNoticeDetail.rows} count={parseInt(myNoticeDetail.count, 0)} />
                </AccountPageLayout>
            </Fragment>
        );
    }
}

NotifyDetailPage.defaultProps = {};

NotifyDetailPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NotifyDetailPage);
