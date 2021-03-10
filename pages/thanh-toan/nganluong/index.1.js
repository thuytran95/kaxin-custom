import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import _ from 'lodash';
import numeral from 'numeral';
import { Table } from 'reactstrap';
import { Cube as Overlay } from 'src/shared/components/loading';
import Link from 'next/link';

class NotificationPage extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { authActions, orderActions } = mapDispatchToProps(store.dispatch);
        const cities = await authActions.getListCity();
        if (query.success === 'true') {
            const { data } = await orderActions.getOrderInfo(query.order_code);
            return {
                title: 'Thanh toán ngân lượng',
                cities,
                orderInfo: data.data
            };
        } else {
            return {
                title: 'Thanh toán ngân lượng',
                orderInfo: {}
            };
        }
    }
    state = {
        text: '',
        isFetching: false
    };
    componentWillMount() {
        const { url: { query } } = this.props;
        const data = _.pick(query, [
            'transaction_info',
            'order_code',
            'price',
            'payment_id',
            'payment_type',
            'error_text',
            'secure_code'
        ]);
        if (query.success === 'true') {
            this.verification(data);
        }
    }

    verification = data => {
        const { orderActions } = this.props;
        this.setState({ isFetching: true });
        orderActions
            .verificationOrder(data)
            .then(() => {
                this.setState({
                    isFetching: false,
                    text: 'Chúc mừng bạn đã thanh toán thành công. Vui lòng kiểm tra email của bạn'
                });
            })
            .catch(err => {
                const error = err.data.message;
                if (error === '{{error.orderIsPaid}}') {
                    this.setState({
                        isFetching: false,
                        text: 'Đơn hàng của bạn đã được thanh toán'
                    });
                } else {
                    this.setState({
                        isFetching: false,
                        text: 'Giao dịch của bạn không thành công.'
                    });
                }
            });
    };
    render() {
        const { isFetching } = this.state;
        const { title, orderInfo, cities, url: { query } } = this.props;
        const items = _.get(orderInfo, 'items', []);
        const city = (orderInfo.city >= 0 && cities[orderInfo.city].name) || '';
        const district =
            (orderInfo.city >= 0 && orderInfo.district >= 0 && cities[orderInfo.city].districts[orderInfo.district]) ||
            '';
        return (
            <Fragment>
                <Overlay loading={isFetching} />
                <Helmet title={title} meta={[{ property: 'og:title', content: title }]} />
                <div className={style.pageWrapper}>
                    <div className="site-main">
                        <div className="container">
                            {query.success === 'true' && <h3 className="title">{this.state.text}</h3>}
                            {query.success === 'false' && (
                                <Fragment>
                                    <div className="errorpage text-center">
                                        <h3 className="title ">
                                            Bạn đã hủy đơn hàng. Truy cập để tiếp tục mua khóa học
                                        </h3>
                                        <Link href="/">
                                            <a className="btn btn-primary">Tiếp tục mua hàng</a>
                                        </Link>
                                    </div>
                                </Fragment>
                            )}

                            {query.success === 'true' && (
                                <Fragment>
                                    <div className="box-content">
                                        <h3>Thông tin cá nhân</h3>
                                        <ul>
                                            <li>
                                                Họ và tên: <b>{orderInfo.fullname}</b>
                                            </li>
                                            <li>
                                                Email: <b>{orderInfo.email}</b>
                                            </li>
                                            <li>
                                                Số điện thoại: <b>{orderInfo.phone}</b>
                                            </li>
                                            <li>
                                                Địa chỉ: <b>{orderInfo.address + ' ' + district + ', ' + city}</b>
                                            </li>
                                            <li>
                                                Phương thức thanh toán:{' '}
                                                <b>
                                                    {orderInfo.method === 'nl' && 'Ngân lượng'}
                                                    {orderInfo.method === 'ib' && 'Banking'}
                                                    {orderInfo.method === 'cod' && 'COD'}
                                                </b>
                                            </li>
                                            <li>
                                                Ghi chú: <b>{orderInfo.note}</b>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box-content">
                                        <h3>Thông tin đơn hàng </h3>
                                        <p>
                                            Mã đơn hàng: <b>{orderInfo.code}</b>
                                        </p>
                                        <Table className="table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên khóa học</th>
                                                    <th>Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items && items.length > 0 ? (
                                                    items.map((item, index) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{_.get(item, 'itemId.name', '...')}</td>
                                                                <td>
                                                                    {!_.isNull(item.amount)
                                                                        ? numeral(item.amount).format('0,0')
                                                                        : '0'}{' '}
                                                                    VNĐ
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">Lỗi dữ liệu</td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td colSpan="3">
                                                        Tổng đơn hàng:{' '}
                                                        <b>
                                                            {!_.isNull(orderInfo.amount)
                                                                ? numeral(orderInfo.amount).format('0,0')
                                                                : '0'}{' '}
                                                            {''}
                                                            VNĐ
                                                        </b>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

NotificationPage.propTypes = {
    url: PropTypes.object,
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderActions: PropTypes.object,
    title: PropTypes.string,
    orderInfo: PropTypes.object,
    cities: PropTypes.array
};

const mapStateToProps = state => {
    const { auth, order } = state;
    return {
        auth,
        order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        orderActions: bindActionCreators(actions.orderActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
