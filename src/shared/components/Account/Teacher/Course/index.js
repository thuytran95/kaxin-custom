import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
//import Link from 'next/link';
import _ from 'lodash';
import { Table } from 'reactstrap';
import PaginateComponent from 'src/shared/components/Pagination';
//import { redirect } from 'src/helpers/Common';
import { TEACHER_LINK, TEACHER_COURSE } from 'src/constants/config';
class TeacherComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    redirectLink = () => {
        window.location.href = TEACHER_LINK;
        //redirect(TEACHER_LINK);
    };
    redirectEditLink = id => {
        window.open(TEACHER_COURSE + `/${id}/edit`, '_blank');
    };
    render() {
        const { data, pagination } = this.props;
        const { rows = [], count = 0 } = data;
        const SquareLogo = '/static/assets/images/logo.png';
        //console.log(rows);
        return (
            <Fragment>
                <div className={style.contentInner}>
                    <section>
                        <div className={style.stTitle}>
                            <h3>Khóa học tôi giảng dạy</h3>
                            <span className="btn btn-primary" onClick={this.redirectLink}>
                                Thêm khóa học
                            </span>
                        </div>
                        <Table>
                            {rows && rows.length > 0 ? (
                                <Fragment>
                                    <thead>
                                        <tr>
                                            <th>{''}</th>
                                            <th>Khoá học</th>
                                            <th>Danh mục</th>
                                            {/* <th>Số chương</th> */}
                                            <th>Bài học</th>
                                            <th>Ngày tạo</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map(item => (
                                            <tr key={item.id}>
                                                <td className={style.courseAvatar}>
                                                    <span
                                                        className={style.theAvt}
                                                        style={{
                                                            backgroundImage: `url(${
                                                                !_.isEmpty(item.courseAvatar)
                                                                    ? item.courseAvatar
                                                                    : SquareLogo
                                                            })`
                                                        }}
                                                    />
                                                </td>
                                                <td className={style.courseName}>
                                                    <b>{item.name}</b>
                                                </td>
                                                <td className={style.catName}>{item.category.name}</td>
                                                {/* <td>{item.totalChapter}</td> */}
                                                <td>{item.totalLesson}</td>
                                                <td>
                                                    {item.createdAt
                                                        ? moment(item.createdAt).format('DD/MM/YYYY')
                                                        : '...'}
                                                </td>
                                                <td className={style.status}>
                                                    {item.active === 0 ? (
                                                        <span className={style.label3}>Ngừng bán</span>
                                                    ) : item.active === 1 ? (
                                                        <span className={style.label2}>Đang bán</span>
                                                    ) : item.active === 2 ? (
                                                        <span className={style.label1}>Chờ duyệt</span>
                                                    ) : (
                                                        <span>Chờ duyệt</span>
                                                    )}
                                                </td>
                                                {/* <td>
                                                    <span
                                                        className={style.btnEdit}
                                                        onClick={() => this.redirectEditLink(item.id)}
                                                    >
                                                        <i className="zmdi zmdi-edit" />
                                                    </span>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Fragment>
                            ) : (
                                <tr>
                                    <td colSpan="6">Chưa có khóa học nào trong danh sách này.</td>
                                </tr>
                            )}
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
TeacherComponent.defaultProps = {
    data: {}
};
TeacherComponent.propTypes = {
    data: PropTypes.object,
    updateParams: PropTypes.func,
    pagination: PropTypes.object
};

export default TeacherComponent;
