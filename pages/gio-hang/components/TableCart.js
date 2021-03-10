import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Popconfirm, message } from 'antd';
import PriceComponent from 'src/shared/components/common/Price';
import _ from 'lodash';

class TableCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: '',
            isDisplayCoupon: true,
            isEdit: false
        };
    }
    removeFromCart = id => {
        const { cartActions, cart } = this.props;
        const dataCart = cart.courses || [];

        cartActions.removeFromCart(id);
        message.success('Sản phẩm đã được xóa khỏi giỏ hàng.');
        if (dataCart.length === 1) {
            window.location.reload(true);
        }
    };

    render() {
        const { cart: { courses = [] } } = this.props;
        const SquareLogo = '/static/assets/images/avatar.jpeg';
        const elmItems = courses.map((item, index) => (
            <tr key={index}>
                <td className={style.index}>{index + 1}</td>
                <td className={style.thumbnail}>
                    <span
                        style={{
                            backgroundImage: `url(${!_.isEmpty(item.courseAvatar) ? item.courseAvatar : SquareLogo})`
                        }}
                    />
                </td>
                <td className={style.content}>
                    <h4>{item.name}</h4>
                    <p>{item.lecturerId ? item.lecturerId.fullname : ''}</p>
                    {/* <div className="rating">
                        <span
                            className="star"
                            style={{
                                width: `${parseFloat(item.star, 10) / 5 * 100}%`
                            }}
                        />
                    </div> */}
                    <span>
                        {item.promotionName && !_.isNull(item.promotionName) ? 'CTKM: ' : ''}
                        <b>{item.promotionName}</b>
                    </span>
                </td>
                <td className={style.priceWrapper}>
                    <div className="price">
                        {item.percent === 0 ? (
                            <span className="amount">
                                <PriceComponent value={parseInt(item.amount, 0)} /> đ
                            </span>
                        ) : (
                            <Fragment>
                                <span className="salePrice">
                                    <PriceComponent value={parseInt(item.amount, 0)} /> đ
                                </span>
                                <span className="regularPrice">
                                    <PriceComponent value={parseInt(item.amountRoot, 0)} /> đ
                                </span>
                            </Fragment>
                        )}
                    </div>
                    {item.percent > 0 ? <span className={style.labelSale}>-{item.percent}%</span> : null}
                    <Popconfirm
                        title="Bạn muốn xóa sản phẩm này?"
                        onConfirm={() => this.removeFromCart(item.id)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <a href="#" className={style.btnDel}>
                            Xóa
                        </a>
                    </Popconfirm>
                </td>
            </tr>
        ));
        return (
            <Fragment>
                <div className={style.tableWrapper}>
                    <Table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th colSpan={2}>Khóa học</th>
                                <th className={style.priceWrapper}>Học phí</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>Chưa có sản phẩm nào</td>
                                </tr>
                            ) : (
                                elmItems
                            )}
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        );
    }
}

TableCart.propTypes = {
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object
};

export default TableCart;
