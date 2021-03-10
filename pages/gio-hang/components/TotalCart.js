import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function displayPrice(number = 0) {
    const digits = number.toString().split('');
    let result = digits[0];
    const length = digits.length;
    for (let i = 1; i < length; i++) {
        if ((length - i) % 3 === 0) result += '.';
        result += digits[i];
    }
    return result;
}

class TotalCart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { total, displayCheckoutButton } = this.props;
        return (
            <Fragment>
                <div className={style.totalWrapper}>
                    <div className={style.total}>
                        <span>Tổng học phí</span>
                        <p>{displayPrice(total)}đ</p>
                    </div>
                    <section>
                        <Link href="/danh-muc">
                            <a className="btn btn-primary">Xem thêm khóa học</a>
                        </Link>
                        {displayCheckoutButton && (
                            <Link href="/thanh-toan">
                                <a className={`btn btn-primary ${style.btnCheckout}`}>Thanh toán</a>
                            </Link>
                        )}
                    </section>
                </div>
            </Fragment>
        );
    }
}

TotalCart.propTypes = {
    total: PropTypes.number,
    displayCheckoutButton: PropTypes.bool
};

export default TotalCart;
