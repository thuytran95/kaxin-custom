import style from './style.scss';
import { Button } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
//import { redirect } from 'src/helpers/Common';
import PriceComponent from 'src/shared/components/common/Price';
import _ from 'lodash';
import { connect } from 'react-redux';
class MiniCartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
    }

    // async componentDidMount() {
    //     await Promise.all([this.genData()]);
    // }
    // genData = () => {
    //     const { cartActions } = this.props;
    //     const ids = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    //     if (_.isEmpty(ids) || _.isNull(ids)) {
    //         return;
    //     } else {
    //         cartActions.fetchCourses().finally(() => this.setState({ isFetching: false }));
    //     }
    // };
    // toCheckout = () => {
    //     const { cartActions } = this.props;
    //     const ids = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    //     if (!_.isEmpty(ids)) {
    //         cartActions.fetchCourses().finally(() => this.setState({ isFetching: false }));
    //     }
    //     redirect('/thanh-toan');
    // };
    componentDidMount() {
        
    }

    render() {
        const SquareLogo = '/static/assets/images/avatar.jpeg';
        const {
            cart: { courses = [] },
        } = this.props;
        //console.log(courses);
        return (
            <Fragment>
                <div className="iconCart">
                    <div className="visible-small">
                        <Link href="/gio-hang">
                            <a>
                                <Fragment>
                                    <i className="zmdi zmdi-shopping-cart" />
                                    {courses.length > 0 ? <em>{courses.length}</em> : <em>0</em>}
                                </Fragment>
                            </a>
                        </Link>
                    </div>
                    <div className="visible-large">
                        <i className="zmdi zmdi-shopping-cart" />
                        {courses.length > 0 ? <em>{courses.length}</em> : <em>0</em>}
                    </div>
                </div>
                <div className="miniCartContent">
                    {courses.length === 0 ? (
                        <p className={style.cartNotice}>Chưa có sản phẩm nào trong giỏ hàng</p>
                    ) : (
                        <Fragment>
                            <p className={style.cartNotice}>{courses.length} sản phẩm trong giỏ hàng</p>
                            <div className={style.cartItems}>
                                <ul>
                                    {courses.map((item, index) => (
                                        <li key={index}>
                                            <div className={style.thumbnail}>
                                                <span
                                                    style={{
                                                        backgroundImage: `url(${
                                                            !_.isEmpty(item.courseAvatar)
                                                                ? item.courseAvatar
                                                                : SquareLogo
                                                        })`,
                                                    }}
                                                />
                                            </div>
                                            <div className={style.content}>
                                                <h5>{item.name}</h5>
                                                <div className="price">
                                                    {item.percent === 0 ? (
                                                        <span className="amount">
                                                            <PriceComponent value={parseInt(item.amount, 0)} />đ
                                                        </span>
                                                    ) : (
                                                        <Fragment>
                                                            <span className="salePrice">
                                                                <PriceComponent value={parseInt(item.amount, 0)} />đ
                                                            </span>
                                                            <span className="regularPrice">
                                                                <PriceComponent value={parseInt(item.amountRoot, 0)} />đ
                                                            </span>
                                                        </Fragment>
                                                    )}

                                                    {item.percent > 0 ? (
                                                        <span className={style.labelSale}>-{item.percent}%</span>
                                                    ) : null}
                                                </div>
                                                <p>
                                                    {item.promotionName && !_.isNull(item.promotionName)
                                                        ? 'CTKM: '
                                                        : ''}
                                                    <b>{item.promotionName}</b>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={style.cartTotal}>
                                <p>Tổng học phí</p>
                                <strong>
                                    <PriceComponent value={courses.reduce((sum, item) => sum + item.amount, 0)} /> đ
                                </strong>
                            </div>

                            <div className={style.cartButons}>
                                <Link href="/gio-hang">
                                    <a className={`btn btn-primary ${style.btnViewCart}`}>Xem giỏ hàng</a>
                                </Link>
                                <Button
                                    className={`btn btn-primary ${this.state.isActive ? style.btnCheckout : ''}`}
                                    onClick={() => {
                                        this.setState({ isActive: true });
                                        this.props.toCheckout();
                                    }}
                                    disabled={this.state.isActive}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        );
    }
}
MiniCartComponent.defaultProps = {
    courses: [],
    cartActions: {},
};
MiniCartComponent.propTypes = {
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    toCheckout: PropTypes.func,
};
export default connect(({ cart }) => ({
    cart,
}))(MiniCartComponent);
