import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
//import NumberFormat from 'react-number-format';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import Link from 'next/link';
import { makeSlug } from 'src/helpers/Common';
import { BuyCourseLink, BuyCourseCTVLink } from 'src/shared/components/Link';
import PriceComponent from 'src/shared/components/common/Price';
import _ from 'lodash';
//import { authentication } from 'src';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directTab: 0
        };
    }

    addToCart = () => {
        const { cartActions, data = {}, query } = this.props;
        cartActions.addToCart(data.id, query.ref);
        notification['success']({
            message: 'Thêm thành công!',
            duration: 2,
            description: 'Khóa học ' + data.name + ' đã được thêm vào giỏ hàng thành công!'
        });
    };

    handleToggle = tab => {
        if (this.state.directTab !== tab || this.state.directTab !== '') {
            this.setState({ directTab: tab });
        }
        if (this.state.directTab === tab) {
            this.setState({ directTab: '' });
        }
    };

    renButton() {
        const { data = {}, cart, query: { ref = '' } } = this.props;
        const { courses = [] } = cart;
        if (
            (data.promotion && !_.isEmpty(data.promotion) && parseInt(data.promotion.amount, 0) === 0) ||
            data.price === 0
        ) {
            return null;
            // return (
            //     <Button type="submit" onClick={() => alert('comming soon')}>
            //         Học miễn phí
            //     </Button>
            // );
        } else {
            const alreadyInCart = courses.some(item => item.id === data.id);
            return (
                <Fragment>
                    <a
                        onClick={this.addToCart}
                        className={`btn btn-primary ${style.addToCart}`}
                        disabled={alreadyInCart}
                    >
                        {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                    </a>
                    {ref ? (
                        <BuyCourseCTVLink type="course" name={data.name} id={data.id} refs={ref}>
                            <a className={`btn btn-primary ${style.buyNow}`}>Mua khoá học</a>
                        </BuyCourseCTVLink>
                    ) : (
                        <BuyCourseLink type="course" name={data.name} id={data.id}>
                            <a className={`btn btn-primary ${style.buyNow}`}>Mua khoá học</a>
                        </BuyCourseLink>
                    )}
                </Fragment>
            );
        }
    }

    renderActionsDiv() {
        const { courseBought, data = {} } = this.props;
        //console.log(data);
        if (courseBought) return null;
        return (
            <div className={`col-12 col-lg-5 rightHeader ${style.rightHeader}`}>
                <div className={style.summary}>
                    <div className={`price ${style.price}`}>
                        {data.promotion && !_.isEmpty(data.promotion) ? (
                            <Fragment>
                                <span className={style.salePrice}>
                                    <PriceComponent value={parseInt(data.promotion.amount, 0)} /> đ
                                </span>
                                <span className={style.regularPrice}>
                                    <PriceComponent value={parseInt(data.promotion.amountRoot, 0)} /> đ
                                </span>
                            </Fragment>
                        ) : (
                            <span className={style.salePrice}>
                                <PriceComponent value={data.price} /> đ
                            </span>
                        )}
                    </div>

                    <div className={`btnActions ${style.btnActions}`}>{this.renButton()}</div>
                </div>
            </div>
        );
    }

    render() {
        const { data = {}, courseBought, rateData } = this.props;
        const listTabs = (courseBought ? ['Giáo trình', 'Thông tin chung'] : ['Thông tin chung', 'Giáo trình']).concat([
            'Đánh giá',
            'Bình luận'
        ]);
        const rate = _.get(rateData, data.id, {});
        const rateAverage = _.get(rate, 'rate', 0);
        return (
            <div className={`pageHeaderStyle ${style.pageHeaderStyle}`}>
                <div className="container">
                    <div className="row">
                        <div className={`col-12 col-lg-7 ${style.leftHeader}`}>
                            <h2>{data.name || 'Chưa có tên khóa học'}</h2>
                            <div className="rating">
                                <span
                                    className="star"
                                    style={{
                                        width: `${rateAverage / 5 * 100}%`
                                    }}
                                />
                            </div>
                            <ul>
                                {listTabs.map((tab, index) => (
                                    <li key={index} onClick={() => this.handleToggle(index)}>
                                        <AnchorLink
                                            href={`#${makeSlug(tab)}`}
                                            //className={classnames({ active: this.state.directTab === index })}
                                        >
                                            {tab}
                                        </AnchorLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {this.renderActionsDiv()}
                    </div>
                </div>
            </div>
        );
    }
}

PageHeader.defaultProps = {
    cart: {}
};

PageHeader.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    rateData: PropTypes.object,
    data: PropTypes.object,
    price: PropTypes.number,
    courseBought: PropTypes.bool,
    query: PropTypes.object
};

export default PageHeader;
