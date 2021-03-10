import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import { Table } from 'reactstrap';
import { OrderHistoryLink } from 'src/shared/components/Link';
import _ from 'lodash';
import PaginateComponent from 'src/shared/components/Pagination';
class OrderHistory extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    render() {
        const { histories, pagination } = this.props;
        const items = histories.rows || [];
        const count = _.get(histories, 'count');
        return (
            <Fragment>
                <div className={style.contentInner}>
                    <section>
                        <h3>Lịch sử đăng ký khóa học</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày mua</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Học phí</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? (
                                    items.map(item => (
                                        <tr key={item.id}>
                                            <td className={style.orderID} data-title="Mã đơn hàng">
                                                <OrderHistoryLink id={item.id}>
                                                    <b>{item.code}</b>
                                                </OrderHistoryLink>
                                            </td>
                                            <td data-title="Ngày mua">
                                                {moment(item.createdAt).format('DD/MM/YYYY hh:mm')}
                                            </td>
                                            <td data-title="Phương thức thanh toán">
                                                {item.method === 'nl' && 'Ngân lượng'}
                                                {item.method === 'ib' && 'Banking'}
                                                {item.method === 'cod' && 'COD'}
                                                {item.method === null && 'Chưa xác định'}
                                            </td>
                                            <td data-title="Học phí">{numeral(item.amount).format('0,0')}đ</td>
                                            <td className={style.status} data-title="Trạng thái">
                                                {item.status === 'transfered' && (
                                                    <span className={style.label3}>Đã giao hàng</span>
                                                )}
                                                {item.status === 'paid' && (
                                                    <span className={style.label2}>Đã thanh toán</span>
                                                )}
                                                {item.status === 'pending' && (
                                                    <span className={style.label1}>Chưa thanh toán</span>
                                                )}
                                                {item.status === 'cancelled' && (
                                                    <span className={style.label1}>Đã hủy đơn hàng</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" data-title="Kết quả">
                                            Không có đơn hàng nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {count >= pagination.perPage && (
                            <PaginateComponent
                                total={count}
                                perPage={pagination.perPage}
                                onChangePage={this.goToPage}
                                current={pagination.current}
                            />
                        )}
                    </section>
                </div>
            </Fragment>
        );
    }
}
OrderHistory.defaultProps = {
    histories: {}
};
OrderHistory.propTypes = {
    authInfo: PropTypes.object,
    histories: PropTypes.object,
    updateParams: PropTypes.func.isRequired,
    pagination: PropTypes.object
};

export default OrderHistory;
