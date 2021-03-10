import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { notification } from 'antd';
import { CourseLink } from 'src/shared/components/Link';
import ImageLoad from 'src/components/image-load';
import PriceComponent from 'src/shared/components/common/Price';
import { CoursePropTypes } from 'src/prop-types';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ItemCourseComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    addToCart = () => {
        const { data, cartActions } = this.props;
        cartActions.addToCart(data.id);
        notification['success']({
            message: 'Thêm thành công!',
            duration: 2,
            description: 'Khóa học ' + data.name + ' đã được thêm vào giỏ hàng thành công!'
        });
    };
    render() {
        const { data, cart } = this.props;
        const { courses = [] } = cart;
        const alreadyInCart = courses.some(item => item.id === data.id);      
        const courseAvatar = !_.isEmpty(data.courseAvatar)
            ? data.courseAvatar
            : '/static/assets/images/courses/default.png';
        const rating = data.rating <= 0 ? 5 : data.rating;
        return (
            <div className={style.wrapper}>
                <div className="itemCourse ">
                    <div className="inner">
                        <div
                            className="imgCourse"
                            style={
                                {
                                    //backgroundImage: `url(${courseAvatar})`
                                }
                            }
                        >
                            {data.promotion && !_.isEmpty(data.promotion) ? (
                                <span className="labelSale">-{data.promotion.percent}%</span>
                            ) : (
                                ''
                            )}
                            <CourseLink {...data} />
                            <ImageLoad src={courseAvatar} alt={data.name} />
                        </div>
                        <div className="infoCourse">
                            <h4>
                                <CourseLink {...data} />
                            </h4>
                            <p>{_.get(data, 'lecturer.firstName')}</p>
                            <div className="rating">
                                <span
                                    className="star"
                                    style={{
                                        width: `${rating / 5 * 100}%`
                                    }}
                                />
                            </div>
                            <div className="price">
                                {data.promotion && !_.isEmpty(data.promotion) ? (
                                    <Fragment>
                                        <span className="amount">
                                            <PriceComponent value={parseInt(data.promotion.amount, 0)} /> đ
                                        </span>
                                        <span className="regularPrice">
                                            <PriceComponent value={parseInt(data.promotion.amountRoot, 0)} /> đ
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span className="amount">
                                        <PriceComponent value={parseInt(data.price, 0)} /> đ
                                    </span>
                                )}
                            </div>
                            {data.promotion && !_.isEmpty(data.promotion) ? (
                                parseInt(data.promotion.amount, 0) === 0 ||
                                _.isNaN(parseInt(data.promotion.amount, 0)) ? (
                                    <div className="addToCart" />
                                ) : (
                                    <div className="addToCart">
                                        <Button
                                            className="btn btn-primary"
                                            onClick={this.addToCart}
                                            disabled={alreadyInCart}
                                        >
                                            {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                                        </Button>
                                    </div>
                                )
                            ) : parseInt(data.price, 0) === 0 ? (
                                <div className="addToCart" />
                            ) : (
                                <div className="addToCart">
                                    <Button
                                        className="btn btn-primary"
                                        onClick={this.addToCart}
                                        disabled={alreadyInCart}
                                    >
                                        {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemCourseComponent.defaultProps = {
    cart: {},
    type: ''
};

ItemCourseComponent.propTypes = {
    data: CoursePropTypes,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    type: PropTypes.string
};

export default ItemCourseComponent;
