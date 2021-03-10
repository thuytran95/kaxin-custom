import style from './style.scss';

import React, { Component, Fragment } from 'react';
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
import classnames from 'classnames';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
//import moment from 'moment';
//import { ReportCourseLink } from 'src/shared/components/Link';
import { generateLinkCourse } from 'src/helpers/Common';
import { reportLink } from 'src/helpers/RouteURL';
import moment from 'moment-timezone';

class ReportCommissionPage extends Component {
    static async getInitialProps(context) {
        const { query } = context;
        const courseId = query && query.courseId ? query.courseId : null;
        const fromDate = query && query.fromDate ? query.fromDate : null;
        const toDate = query && query.toDate ? query.toDate : null;
        const status = query && query.status ? query.status : null;
        const href = '/bao-cao-thu-nhap';
        return {
            title: 'Báo cáo thu nhập',
            courseId,
            fromDate,
            toDate,
            status,
            href,
            layout: 'auth',
            requireAuth: true
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isPopup: false,
            copied: false,
            params: {
                pagination: {
                    current: 1,
                    perPage: 10
                }
            },
            coursesId: [],
            fromDate: null,
            toDate: null,
            status: null,
            selCourses: []
        };
    }
    componentDidMount() {
        this.getDataCourse();
        this.getCourseDetail();
        this.getProcess();
        this.getData();
    }
    getDataCourse = (params = {}) => {
        // const { courseActions } = this.props;
        // courseActions
        //     .listCourse({
        //         limit: 100000,
        //         start: 0,
        //         ...params
        //     })
        //     .finally(() => {
        //         this.setState({ isFetching: false });
        //     });
        const { userActions } = this.props;
        userActions.getReportHistory({ start: 0, limit: 10000 }).then(res => {
            this.setState({ isFetching: false, selCourses: res.data.rows });
        });
    };
    getCourseDetail = (params = {}) => {
        const { courseActions, courseId } = this.props;
        if (courseId) {
            courseActions.getCourse(parseInt(courseId, 0)).finally(() => {
                this.setState({ isFetching: false });
            });
        }
    };
    onSearch = filter => {
        this.setState(
            {
                fromDate: filter.fromDate,
                toDate: filter.toDate,
                status: filter.status,
                coursesId: filter.courseId
            },
            () => {
                this.getData();
            }
        );
    };
    onChangePage = current => {
        const { pagination } = this.state.params;

        this.setState(
            {
                params: {
                    ...this.state.params,
                    pagination: { ...pagination, current }
                }
            },
            () => {
                this.getData();
            }
        );
    };

    generateQuery = () => {
        const { params: { pagination = {} } } = this.state;
        return {
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage
        };
    };
    getData = (params = {}) => {
        const { userActions } = this.props;
        const query = this.generateQuery();
        const { fromDate, toDate, status, coursesId } = this.state;
        if (fromDate && toDate) {
            Object.assign(query, {
                fromDate: moment(fromDate, 'YYYY-MM-DD HH:mm:ss')
                    .tz('UTC')
                    .format(),
                toDate: moment(toDate, 'YYYY-MM-DD HH:mm:ss')
                    .tz('UTC')
                    .format()
            });
        }
        if (status && !_.isEmpty(_.trim(status))) {
            Object.assign(query, {
                status
            });
        }
        if (coursesId && !_.isEmpty(coursesId)) {
            Object.assign(query, {
                courseId: JSON.stringify(coursesId)
            });
        }
        userActions.getReportHistory({ ...query, ...params }).finally(() => {
            this.setState({ isFetching: false });
        });
        if (this.props.courseId) {
            userActions
                .getReportCourseHistory(this.props.courseId, { ..._.omit(query, 'courseId'), ...params })
                .finally(() => {
                    this.setState({ isFetching: false });
                });
        }
    };
    getProcess = () => {
        const { userActions } = this.props;
        userActions.getProcess().finally(() => {
            this.setState({ isFetching: false });
        });
    };
    getCourseHistory = (id, fromDate, toDate, status) => {
        window.open(generateLinkCourse(reportLink({ id, fromDate, toDate, status })), '_blank');
    };
    render() {
        const {
            title,
            href,
            user: { process = {}, listReport = {}, reportCourse = {} },
            course: { courseDetail = {} },
            authInfo,
            ...remains
        } = this.props;
        const { params } = this.state;
        const { rows = [], count } = listReport;
        const courses = this.state.selCourses.map(function(obj) {
            return obj.courseId;
        });
        const commissionCourse = _.uniqBy(courses, 'id');
        return (
            <AccountPageLayout title={title} href={href} {...remains}>
                <Fragment>
                    <div className={style.contentInner}>
                        <div className={style.countBox}>
                            <div className="row">
                                <div className="col-xs-6 col-md-3">
                                    <div className={classnames([style.innerBox], [style.color1])}>
                                        <b>{process.current.courses}</b>
                                        <span>KHOÁ HỌC ĐÃ BÁN</span>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-3">
                                    <div className={classnames([style.innerBox], [style.color2])}>
                                        <b>{numeral(process.current.amount).format('0,0')}đ</b>
                                        <span>Tổng số hoa hồng</span>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-3">
                                    <div className={classnames([style.innerBox], [style.color3])}>
                                        <b>{numeral(process.current.amountUnpaid).format('0,0')}đ</b>
                                        <span>
                                            Hoa hồng<br />chưa thanh toán
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-3">
                                    <div className={classnames([style.innerBox], [style.color4])}>
                                        <b>{numeral(process.current.amountPaid).format('0,0')}đ</b>
                                        <span>
                                            Hoa hồng<br />đã thanh toán
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section>
                            <div className={style.stTitle}>
                                <h3>Biểu đồ doanh thu</h3>
                            </div>
                            <div className={style.chart}>
                                <ResponsiveContainer width={`100%`} height={250}>
                                    <AreaChart
                                        data={process.rows}
                                        syncId="anyId"
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="10%" stopColor="#ffffff" stopOpacity={1} />
                                                <stop offset="90%" stopColor="#ffffff" stopOpacity={0.3} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#0071bb"
                                            fill="#ffffff"
                                            dot="#0071bb"
                                            activeDot={{ r: 6 }}
                                            fillOpacity={1}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </section>
                        <section>
                            <div className={style.stTitle}>
                                <h3>
                                    {this.props.courseId
                                        ? courseDetail ? courseDetail.name : 'Chi tiết hoa hồng'
                                        : 'Lịch sử hoa hồng'}
                                </h3>
                                <h5>
                                    Mã cộng tác viên:{' '}
                                    <b>{authInfo.userInfo.partnerCode ? authInfo.userInfo.partnerCode : '...'}</b>
                                </h5>
                            </div>
                            <HeaderFilter
                                onSearch={this.onSearch}
                                dataCourses={commissionCourse}
                                courseId={this.props.courseId}
                                fromDate={this.props.fromDate}
                                toDate={this.props.toDate}
                                status={this.props.status}
                            />
                            {this.props.courseId ? (
                                <Fragment>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className="text-left">Ngày thanh toán</th>
                                                <th>Giá gốc</th>
                                                <th>% hoa hồng</th>
                                                <th>Tổng hoa hồng</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportCourse.rows && reportCourse.rows.length > 0 ? (
                                                reportCourse.rows.map((item, i) => (
                                                    <tr key={i}>
                                                        <td className="text-left" data-title="Ngày thanh toán">
                                                            {moment(item.updatedAt).format('HH:mm')} <br />
                                                            {moment(item.updatedAt).format('DD/MM/YYYY')}
                                                        </td>
                                                        <td data-title="Giá gốc">
                                                            {numeral(item.amountRoot).format('0,0')}đ
                                                        </td>
                                                        <td data-title="% hoa hồng">
                                                            {item.percentPartner ? item.percentPartner : 0}%<br />
                                                            {numeral(
                                                                item.amountRoot * item.percentPartner / 100
                                                            ).format('0,0')}đ
                                                        </td>
                                                        <td data-title="Tổng hoa hồng">
                                                            {numeral(item.commission).format('0,0')}đ
                                                        </td>
                                                        <td data-title="Trạng thái">
                                                            {item.paymentStatusPartner === true ? (
                                                                <span className={style.success}>Đã thanh toán</span>
                                                            ) : (
                                                                <span className={style.error}>Chưa thanh toán</span>
                                                            )}
                                                        </td>
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
                                    {reportCourse.count >= params.pagination.perPage && (
                                        <Pagination
                                            total={reportCourse.count}
                                            perPage={params.pagination.perPage}
                                            onChangePage={this.onChangePage}
                                            current={params.pagination.current}
                                        />
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className="text-left">Ngày thanh toán</th>
                                                <th className="text-left">Khoá học</th>
                                                <th>Giá gốc</th>
                                                <th>% hoa hồng</th>
                                                <th>Số lượt bán</th>
                                                <th>Tổng hoa hồng</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows && rows.length > 0 ? (
                                                rows.map((item, i) => (
                                                    <tr key={i + 'a'}>
                                                        <td className="text-left" data-title="Ngày thanh toán">
                                                            {moment(item.updatedAt).format('DD/MM/YYYY')}
                                                        </td>
                                                        <td
                                                            className={`text-left ${style.courseName}`}
                                                            onClick={() =>
                                                                this.getCourseHistory(
                                                                    item.courseId.id,
                                                                    this.state.fromDate,
                                                                    this.state.toDate,
                                                                    this.state.status
                                                                )
                                                            }
                                                            data-title="Khoá học"
                                                        >
                                                            <b>
                                                                {item.courseId && item.courseId.name
                                                                    ? item.courseId.name
                                                                    : item.courseId}
                                                            </b>
                                                        </td>
                                                        <td data-title="Giá gốc">
                                                            {numeral(item.amountRoot).format('0,0')}đ
                                                        </td>
                                                        <td data-title="% hoa hồng">
                                                            {item.percentPartner ? item.percentPartner : 0}%<br />
                                                            {numeral(
                                                                item.amountRoot * item.percentPartner / 100
                                                            ).format('0,0')}đ
                                                        </td>
                                                        <td data-title="Số lượt bán">
                                                            {item.numberCourses ? item.numberCourses : 0}
                                                        </td>
                                                        <td data-title="Tổng hoa hồng">
                                                            {numeral(item.commission).format('0,0')}đ
                                                        </td>
                                                        <td data-title="Trạng thái">
                                                            {item.paymentStatusPartner === true ? (
                                                                <span className={style.success}>Đã thanh toán</span>
                                                            ) : (
                                                                <span className={style.error}>Chưa thanh toán</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" data-title="Kết quả">
                                                        Không tìm thấy dữ liệu
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                    {count >= params.pagination.perPage && (
                                        <Pagination
                                            total={count}
                                            perPage={params.pagination.perPage}
                                            onChangePage={this.onChangePage}
                                            current={params.pagination.current}
                                        />
                                    )}
                                </Fragment>
                            )}
                        </section>
                    </div>
                </Fragment>
            </AccountPageLayout>
        );
    }
}

ReportCommissionPage.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object,
    userActions: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    authInfo: PropTypes.object,
    courseId: PropTypes.string
};

const mapStateToProps = state => {
    const { auth, user, course, category } = state;
    return { authInfo: auth, user, course, category };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(actions.userActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCommissionPage);
