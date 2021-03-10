import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
//import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import Slider from 'react-slick';
// import ItemCourseComponent from 'src/shared/components/Item/Course';
import CourseItem from 'src/shared/components/Course/CourseItem';

class CarouselComponent extends PureComponent {
    render() {
        const { items = [], cart, cartActions } = this.props;
        const settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 4,
            lazyLoad: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                        // infinite: true,
                        // dots: true
                    }
                },

                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Fragment>
                <div className={style.carouselWrapper}>
                    <div className="row">
                        <Slider {...settings}>
                            {items.map(item => (
                                <div key={item.id} className="course-items">
                                    <CourseItem data={item} cart={cart} cartActions={cartActions} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </Fragment>
        );
    }
}

CarouselComponent.defaultProps = {};
CarouselComponent.propTypes = {
    type: PropTypes.number,
    items: PropTypes.array,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired
};

const mapStateToProps = ({ cart }) => {
    return { cart };
};

const mapDispatchToProps = dispatch => {
    return {
        cartActions: bindActionCreators(actions.cartActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselComponent);
