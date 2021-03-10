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
        return {
            title: 'Thanh toán ngân lượng'
        };
    }

    state = {
        cities: [],
        text: '',
        isFetching: false
    };
    componentDidMount() {
        const { authActions } = this.props;
        authActions.getListCity().then(res => {
            this.setState({ cities: _.get(res, 'data.data', []) });
        });

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
        this.verification(data);
        // if (!_.isNull(data) || !_.isEmpty(data)) {
        //     //console.log(data);
        //     this.verification(data);
        // }
    }
    verification = data => {
        const { orderActions } = this.props;
        this.setState({ isFetching: true });
        orderActions
            .verificationOrder(data)
            .then(res => {
                this.setState({ isFetching: false });
                this.setState({
                    text: 'Chúc mừng bạn đã thanh toán thành công. Vui lòng kiểm tra email của bạn'
                });
            })
            .catch(err => {
                this.setState({ isFetching: false });
                const error = err.data.message;
                if (error === '{{error.orderIsPaid}}') {
                    this.setState({
                        text: 'Đơn hàng của bạn đã được thanh toán'
                    });
                } else if (error === '{{error.orderNotFound}}') {
                    this.setState({
                        text: 'Giao dịch lỗi. Đơn hàng của bạn không tồn tại'
                    });
                } else {
                    this.setState({
                        text: 'Giao dịch của bạn không thành công.'
                    });
                }
            });
    };
    render() {
        const { isFetching, cities } = this.state;
        const { title, url: { query }, order: { checkoutInfo = {} } } = this.props;
        const items = _.get(checkoutInfo, 'items', []);
        const city = checkoutInfo.city && !_.isEmpty(checkoutInfo.city) ? cities[checkoutInfo.city].name : '';
        const dist = _.values(_.get(cities, `[${checkoutInfo.city}].districts`, {}));
        const district = checkoutInfo.district && !_.isEmpty(checkoutInfo.district) ? dist[checkoutInfo.district] : '';
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

                            {!_.isEmpty(checkoutInfo) &&
                                query.success === 'true' && (
                                    <Fragment>
                                        <div className="box-content">
                                            <h3>Thông tin cá nhân</h3>
                                            <ul>
                                                <li>
                                                    Họ và tên: <b>{checkoutInfo.fullname}</b>
                                                </li>
                                                <li>
                                                    Email: <b>{checkoutInfo.email}</b>
                                                </li>
                                                <li>
                                                    Số điện thoại: <b>{checkoutInfo.phone}</b>
                                                </li>
                                                <li>
                                                    Địa chỉ <b>{checkoutInfo.address + ' ' + district + ', ' + city}</b>
                                                </li>
                                                <li>
                                                    Phương thức thanh toán:{' '}
                                                    <b>
                                                        {checkoutInfo.method === 'nl' && 'Ngân lượng'}
                                                        {checkoutInfo.method === 'ib' && 'Banking'}
                                                        {checkoutInfo.method === 'cod' && 'COD'}
                                                    </b>
                                                </li>
                                                <li>
                                                    Ghi chú: <b>{checkoutInfo.note}</b>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="box-content">
                                            <h3>Thông tin đơn hàng </h3>
                                            <p>
                                                Mã đơn hàng: <b>{checkoutInfo.code}</b>
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
                                                                {!_.isNull(checkoutInfo.amount)
                                                                    ? numeral(checkoutInfo.amount).format('0,0')
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
