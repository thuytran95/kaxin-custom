import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import OrderHistory from 'src/shared/components/Account/Order/History';

class OrderHistoriesPage extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'auth',
            requireAuth: true,
            title: 'Lịch sử đăng ký khóa học'
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            params: {
                pagination: {
                    current: 1,
                    perPage: 10
                }
            }
        };
    }
    componentWillMount() {
        this.getData();
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };

    getData = () => {
        const { orderActions } = this.props;
        const query = {
            filter: JSON.stringify([{ operator: 'ne', value: 'draft', property: 'status' }]),
            sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }]),
            start: (this.state.params.pagination.current - 1) * this.state.params.pagination.perPage,
            limit: this.state.params.pagination.perPage
        };
        orderActions.getOrderHistories(query);
    };
    render() {
        const { title, authInfo, order, common, ...remains } = this.props;
        const { histories = {} } = order;

        //console.log(histories);
        return (
            <AccountPageLayout title={title} {...remains}>
                <OrderHistory
                    histories={histories}
                    common={common}
                    authInfo={authInfo}
                    updateParams={this.updateParams}
                    pagination={this.state.params.pagination}
                />
            </AccountPageLayout>
        );
    }
}
OrderHistoriesPage.defaultProps = {
    authInfo: {},
    authActions: {},
    order: {},
    orderActions: {}
};

OrderHistoriesPage.propTypes = {
    authInfo: PropTypes.object,
    statusCode: PropTypes.number,
    hasError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    order: PropTypes.object,
    orderActions: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, order } = state;
    return { authInfo: auth, order };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        orderActions: bindActionCreators(actions.orderActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoriesPage);
