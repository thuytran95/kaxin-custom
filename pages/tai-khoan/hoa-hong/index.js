import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import _ from 'lodash';
import numeral from 'numeral';
import { Table } from 'reactstrap';
import Pagination from 'src/shared/components/common/pagination';
import HeaderFilter from './HeaderFilter';
import moment from 'moment';

class TipPage extends Component {
    static async getInitialProps(context) {
        return {
            title: 'Quản lý hoa hồng',
            layout: 'auth',
            requireAuth: true
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            status: '',
            pagination: {
                current: 1,
                perPage: 10
            }
        };
    }
    componentDidMount() {
        this.getData();
    }
    onSearch = filter => {
        this.setState(
            {
                filter,
                pagination: {
                    ...this.state.pagination,
                    current: 1,
                    perPage: 10
                },
                status: filter.status,
                dateFilter: filter.dateFilter
            },
            () => this.getData()
        );
    };
    generateQuery = () => {
        const { pagination: { current, perPage }, status, dateFilter } = this.state;
        return {
            start: current > 1 ? (current - 1) * perPage : 0,
            limit: perPage,
            status,
            dateFilter
        };
    };
    getData = (params = {}) => {
        const query = this.generateQuery();
        const { userActions } = this.props;

        userActions.listCommission({ ...query, ...params }).finally(() => {
            this.setState({ isFetching: false });
        });
    };

    onChangePage = current => {
        const { pagination } = this.state;

        this.setState(
            {
                pagination: { ...pagination, current }
            },
            () => this.getData()
        );
    };

    render() {
        const { title, user: { listCommission = {} }, ...remains } = this.props;
        const { pagination } = this.state;
        const { rows = [], count } = listCommission;
        //console.log(rows);
        return (
            <AccountPageLayout title={title} {...remains}>
                <div className={style.contentInner}>
                    {/* <section>
                        <h3>MÃ AFFILIATE</h3>
                        <h5>
                            MÃ AFFILIATE CỦA BẠN: <b>141307</b>
                        </h5>
                        <p>
                            Bạn được ngay hoa hồng từ 40%-50% trên mỗi khóa học. Người sử dụng mã affiliate này cũng
                            được giảm học phí 40% khi mua khóa học.{' '}
                        </p>
                    </section> */}
                    <section>
                        <div className={style.stTitle}>
                            <h3>Quản lý hoa hồng</h3>
                            {/* <span>
                                Tổng tiền hoa hồng <b>180.000đ</b>
                            </span> */}
                        </div>
                        <HeaderFilter onSearch={this.onSearch} />
                        <Table>
                            <thead>
                                <tr>
                                    <th>Tháng</th>
                                    <th>Khoá học</th>
                                    <th>Giá</th>
                                    <th>% hoa hồng</th>
                                    <th>Số lượt bán</th>
                                    <th>Tiền hoa hồng</th>
                                    {/* <th>Trạng thái</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.length > 0 ? (
                                    rows.map(item => (
                                        <tr key={item.id}>
                                            <td data-title="Tháng">{moment(item.updated_at).format('MM/YYYY')}</td>
                                            <td className={style.courseName} data-title="Khoá học">
                                                <b>
                                                    {item.courseid && item.courseid.name ? item.courseid.name : '...'}
                                                </b>
                                            </td>
                                            <td data-title="Giá">{numeral(item.amount_root).format('0,0')}đ</td>
                                            <td data-title="% hoa hồng">
                                                {item.percent_teacher ? item.percent_teacher : 0}%
                                            </td>
                                            <td data-title="Số lượt bán">{item.numbercourses}</td>
                                            <td data-title="Tiền hoa hồng">
                                                {numeral(item.commission).format('0,0')}đ
                                            </td>
                                            {/* <td>{item.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" data-title="Kết quả">
                                            Không tìm thấy dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {count >= pagination.perPage && (
                            <Pagination
                                total={count}
                                perPage={pagination.perPage}
                                onChangePage={this.onChangePage}
                                current={pagination.current}
                            />
                        )}
                    </section>
                </div>
            </AccountPageLayout>
        );
    }
}

TipPage.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object,
    userActions: PropTypes.object
};

const mapStateToProps = state => {
    const { user } = state;
    return { user };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(actions.userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TipPage);
