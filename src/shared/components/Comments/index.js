import style from './style.scss';

import React, { Component, Fragment } from 'react';
//import Slider from 'react-slick';
import PropTypes from 'prop-types';
import CourseItem from 'src/shared/components/Course/CourseItem';

class FeaturedComment extends Component {
    render() {
        const { data, cart, cartActions } = this.props;
        const { rows = [] } = data;
        return (
            <Fragment>
                {rows.length > 0 ? (
                    <div className={style.commentWrapper}>
                        <div className="container">
                            <h2 className="titleHome">Khóa học đang khuyến mãi</h2>
                            <div className="row">
                                {rows.map((item, index) => {
                                    if (index > 7) return null;
                                    return (
                                        <div key={item.id} className="col-6 col-lg-3 course-items">
                                            <CourseItem data={item} cart={cart} cartActions={cartActions} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

FeaturedComment.defaultProps = {
    cart: {},
    data: {}
};

FeaturedComment.propTypes = {
    data: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired
};

export default FeaturedComment;
