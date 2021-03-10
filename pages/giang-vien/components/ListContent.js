import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CourseItem from 'src/shared/components/Course/CourseItem';
import { CoursePropTypes } from 'src/prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function getListPages(numberOfItems = 0, perPage = 10) {
    const numberOfPages = Math.floor((numberOfItems + perPage - 1) / perPage);
    const result = [];
    for (let i = 0; i < numberOfPages; i++) result.push(i + 1);
    return result;
}

class ListContent extends Component {
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    render() {
        const { listCourse, cart, cartActions, pagination } = this.props;
        const count = _.get(listCourse, 'data.count');
        const items = _.get(listCourse, 'data.rows');
        return (
            <div className={style.contentWrapper}>
                <h3>Khoá học của Giảng viên</h3>
                <div className="row">
                    {items.map(item => (
                        <div key={item.id} className={`col-6 col-lg-3 ${style.courseItems}`}>
                            <CourseItem data={item} cart={cart} cartActions={cartActions} />
                        </div>
                    ))}
                </div>

                {count >= pagination.perPage && (
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                previous
                                onClick={() => this.goToPage(pagination.current - 1)}
                                disabled={pagination.current === 1}
                            />
                        </PaginationItem>
                        {getListPages(count, pagination.perPage).map(index => (
                            <PaginationItem key={index} active={index === pagination.current}>
                                <PaginationLink onClick={() => this.goToPage(index)}>{index}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationLink
                                next
                                onClick={() => this.goToPage(pagination.current + 1)}
                                disabled={pagination.current * pagination.perPage >= count}
                            />
                        </PaginationItem>
                    </Pagination>
                )}
                {items.length === 0 && 'Chưa có khóa học nào trong danh mục này'}
            </div>
        );
    }
}

ListContent.propTypes = {
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

export default ListContent;
