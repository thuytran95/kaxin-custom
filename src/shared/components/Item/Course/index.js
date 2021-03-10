import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { notification } from 'antd';
import _ from 'lodash';
import { CourseLink } from 'src/shared/components/Link';
import { CoursePropTypes } from 'src/prop-types';
import PriceComponent from 'src/shared/components/common/Price';
import PropTypes from 'prop-types';
// function displayPrice(number = 0) {
//     const digits = number.toString().split('');
//     let result = digits[0];
//     const length = digits.length;
//     for (let i = 1; i < length; i++) {
//         if ((length - i) % 3 === 0) result += '.';
//         result += digits[i];
//     }
//     return result;
// }
class ItemCourseComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    openNotification = () => {
        const { data } = this.props;
        notification['success']({
            message: 'Thêm thành công!',
            description: 'Khóa học ' + data.name + ' đã được thêm vào giỏ hàng thành công!'
        });
    };
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
        const courseAvatar = !_.isEmpty(data.courseAvatar) ? data.courseAvatar : '/static/assets/images/course1.png';
        return (
            <Fragment>
                <div className={`itemCourse ${style.itemCourse}`}>
                    <div className="inner">
                        <div className="imgCourse">
                            <img src={courseAvatar} alt={data.name} />
                            {/*{data.salePrice !== null ? (
                                <span className="labelSale">{data.percent.toFixed(0)}%</span>
                            ) : (
                                ''
                            )}*/}
                        </div>
                        <div className="infoCourse">
                            <h4>
                                <CourseLink {...data} />
                            </h4>
                            <p>{_.get(data, 'lecturer.fullname', '')}</p>
                            <div className="rating">
                                <span
                                    className="star"
                                    style={{
                                        width: `${parseInt(data.star, 10) / 5 * 100}%`
                                    }}
                                />
                            </div>
                            <div className="price">
                                <span className="amount">
                                    <PriceComponent value={data.price} />đ
                                </span>
                                {/*{data.salePrice === null ? (
                                    <span className="amount">{data.regularPrice}đ</span>
                                ) : (
                                    <Fragment>
                                        <span className="salePrice">{displayPrice(price)}đ</span>{' '}
                                        <span className="regularPrice"> {displayPrice(data.price)}đ </span>
                                    </Fragment>
                                )}*/}
                            </div>
                            <div className="addToCart">
                                <Button className="btn btn-primary" onClick={this.addToCart} disabled={alreadyInCart}>
                                    {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

ItemCourseComponent.defaultProps = {
    cart: {}
};

ItemCourseComponent.propTypes = {
    data: CoursePropTypes,
    cart: PropTypes.object,
    cartActions: PropTypes.object
};

export default ItemCourseComponent;
