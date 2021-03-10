import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import _ from 'lodash';
import PaginateComponent from 'src/shared/components/Pagination';
import CourseItem from 'src/shared/components/Course/CourseItem';
import { CoursePropTypes } from 'src/prop-types';
import classnames from 'classnames';

class CategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChangeOrdering = value => {
        this.props.updateParams({ sort: value });
    };
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    render() {
        const { listCourse, cart, cartActions, pagination } = this.props;
        const count = _.get(listCourse, 'data.count');
        const items = _.get(listCourse, 'data.rows');
        return (
            <Fragment>
                <div className="col-12 col-lg-9 site-content">
                    <div
                        className={classnames(style.ordering, {
                            [style.active]: this.props.isShowInfo === 'ordering'
                        })}
                    >
                        <Select defaultValue="" onChange={this.onChangeOrdering}>
                            <Select.Option value="">--- Sắp xếp ---</Select.Option>
                            <Select.Option value={'[{"property":"price", "direction":"DESC" }]'}>
                                Giá thấp dần
                            </Select.Option>
                            <Select.Option value={'[{"property":"price", "direction":"ASC" }]'}>
                                Giá cao dần
                            </Select.Option>
                            {/* <Select.Option value={2}>Đánh giá cao</Select.Option>
                                <Select.Option value={3}>Quan tâm nhiều nhất</Select.Option> */}
                            <Select.Option value={'[{"property":"name", "direction":"ASC" }]'}>
                                Sắp xếp từ A-Z
                            </Select.Option>
                            <Select.Option value={'[{"property":"name", "direction":"DESC" }]'}>
                                Sắp xếp từ Z-A
                            </Select.Option>
                        </Select>
                    </div>
                    <div className="visible-small">
                        <div className={style.sortWrapper}>
                            <span
                                className={style.btnFilter}
                                onClick={() => {
                                    this.props.handleToggle('filter');
                                }}
                            >
                                <i className="zmdi zmdi-filter-list" /> Bộ lọc
                            </span>
                            <span
                                className={style.btnOrdering}
                                onClick={() => {
                                    this.props.handleToggle('ordering');
                                }}
                            >
                                <i className="zmdi zmdi-sort-asc" />Sắp xếp
                            </span>
                        </div>
                    </div>
                    <div className={style.contentWrapper}>
                        <div className="row">
                            {items.filter(item => item.active === 1).map(item => (
                                <div key={item.id} className={`col-6 col-lg-4 ${style.courseItems}`}>
                                    <CourseItem data={item} cart={cart} cartActions={cartActions} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {count >= pagination.perPage && (
                        <PaginateComponent
                            total={count}
                            perPage={pagination.perPage}
                            onChangePage={this.goToPage}
                            current={pagination.current}
                        />
                    )}
                    {items.length === 0 && 'Chưa có khóa học nào trong danh mục này'}
                </div>
            </Fragment>
        );
    }
}

CategoryComponent.propTypes = {
    handleToggle: PropTypes.func,
    isShowInfo: PropTypes.string,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    courseActions: PropTypes.object.isRequired,
    listCourse: PropTypes.shape({
        data: PropTypes.shape({
            count: PropTypes.number,
            rows: PropTypes.arrayOf(CoursePropTypes),
            totalCourseActive: PropTypes.number,
            totalCourseDeactive: PropTypes.number,
            totalCoursePending: PropTypes.number
        })
    }),
    updateParams: PropTypes.func.isRequired,
    pagination: PropTypes.object
};

export default CategoryComponent;
