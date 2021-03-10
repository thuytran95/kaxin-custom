import styles from './style.scss';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CourseItem from 'src/shared/components/Course/CourseItem';

const ListCourse = ({ items, cart, cartActions }) => {
    return (
        <Fragment>
            <div className={`row ${styles.contentInner}`}>
                {items &&
                    items.map(item => (
                        <div key={item.id} className={`col-6 col-lg-4 ${styles.courseItems}`}>
                            <CourseItem data={item} cart={cart} cartActions={cartActions} />
                        </div>
                    ))}
            </div>
            {items && items.length === 0 && 'Không có kết quả tìm kiếm phù hợp'}
        </Fragment>
    );
};

ListCourse.defaultProps = {
    items: []
};

ListCourse.propTypes = {
    items: PropTypes.array,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired
};

export default ListCourse;
