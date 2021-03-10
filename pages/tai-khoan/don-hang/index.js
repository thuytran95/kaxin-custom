import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap';
import moment from 'moment';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import { moneyFormat } from 'src/helpers/Common';
import AccountPageLayout from '../layout';
import _ from 'lodash';

class OrderDetailsPage extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { orderActions } = mapDispatchToProps(store.dispatch);
        try {
            await orderActions.getOrderHistory(query.id);
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Chi tiết đơn hàng'
            };
        } catch (e) {
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Chi tiết đơn hàng'
            };
        }
    }
    render() {
        const { title, order, ...remains } = this.props;
        const { orderDetailsHistory = {} } = order;
        const { items = [] } = orderDetailsHistory;
        //console.log(orderDetailsHistory);
        return (
            <AccountPageLayout title={title} {...remains}>
                <Fragment>
                    <div className={style.contentInner}>
                        <section className={style.commonInfo}>
                            <h3>Thông tin đơn hàng</h3>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Mã đơn hàng:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p className={style.boldText}>{orderDetailsHistory.code}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Số tiền:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p className={style.boldText}>
                                                    {moneyFormat(orderDetailsHistory.amount)}đ
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Người mua:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p>{orderDetailsHistory.fullname}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Trạng thái đơn hàng:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p>
                                                    {orderDetailsHistory.status === 'paid' && 'Đã thanh toán'}
                                                    {orderDetailsHistory.status === 'pending' && 'Chưa thanh toán'}
                                                    {orderDetailsHistory.status === 'draft' && 'Chưa xác định'}
                                                    {orderDetailsHistory.status === 'cancelled' && 'Đã bị hủy'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Ngày ghi nhận:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p>
                                                    {moment(orderDetailsHistory.createdAt).format('DD/MM/YYYY hh:mm')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <p className={style.label}>Hình thức thanh toán:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <p>
                                                    {orderDetailsHistory.method === 'nl' && 'Ngân lượng'}
                                                    {orderDetailsHistory.method === 'ib' && 'Banking'}
                                                    {orderDetailsHistory.method === 'cod' && 'COD'}
                                                    {_.isNull(orderDetailsHistory.method) && 'Chưa xác định'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className={style.contentInner}>
                        <section>
                            <h3>Danh sách mặt hàng</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Khóa học</th>
                                        <th>Học phí</th>
                                        <th>CTKM</th>
                                        <th>Coupon</th>
                                        <th>Mã kích hoạt</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td data-title="Khóa học">
                                                <span className={style.courseName}>
                                                    {item.itemId && item.itemId.name}
                                                </span>
                                            </td>
                                            <td data-title="Học phí">{moneyFormat(item.amount)}đ</td>
                                            <td data-title="CTKM">{item.promotion}</td>
                                            <td data-title="Coupon">{item.coupon}</td>
                                            <td data-title="Mã kích hoạt">
                                                {orderDetailsHistory.status === 'paid' ? item.code : '...'}
                                            </td>
                                            <td data-title="Tình trạng">
                                                {orderDetailsHistory.status === 'paid' &&
                                                    item.status === 'new' && (
                                                        <span className={style.notActivated}>Chưa kích hoạt</span>
                                                    )}
                                                {orderDetailsHistory.status === 'paid' &&
                                                    item.status === 'active' && (
                                                        <span className={style.activated}>Đã kích hoạt</span>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </section>
                    </div>
                </Fragment>
            </AccountPageLayout>
        );
    }
}
OrderDetailsPage.defaultProps = {
    authInfo: {},
    authActions: {},
    order: {},
    orderActions: {}
};

OrderDetailsPage.propTypes = {
    authInfo: PropTypes.object,
    statusCode: PropTypes.number,
    hasError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    order: PropTypes.object
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

export default connect(mapStateToProps)(OrderDetailsPage);
