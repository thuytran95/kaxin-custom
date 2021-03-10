import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import GiftComponent from 'src/shared/components/Account/Gift/index';

class GiftPage extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { giftActions } = mapDispatchToProps(store.dispatch);
        try {
            const filter = JSON.stringify([{ operator: 'eq', value: 'website', property: 'platform' }]);
            await giftActions.getMyGift({ filter });
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Quà tặng của tôi'
            };
        } catch (e) {
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Quà tặng của tôi'
            };
        }
    }
    render() {
        const { title, authInfo, giftActions, gift: { myGift = {} }, ...remains } = this.props;
        return (
            <AccountPageLayout title={title} {...remains}>
                <GiftComponent authInfo={authInfo} giftActions={giftActions} items={myGift.rows} />
            </AccountPageLayout>
        );
    }
}
GiftPage.defaultProps = {
    authInfo: {},
    authActions: {}
};

GiftPage.propTypes = {
    title: PropTypes.string.isRequired,
    authInfo: PropTypes.object,
    gift: PropTypes.object,
    giftActions: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, gift } = state;
    return { authInfo: auth, gift };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        giftActions: bindActionCreators(actions.giftActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftPage);
