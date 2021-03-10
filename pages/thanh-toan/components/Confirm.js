import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { METHODS } from '../constants';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user, method, cities } = this.props;
        const city = (user.city >= 0 && cities[user.city].name) || '';
        //const district = (user.city >= 0 && user.district >= 0 && cities[user.city].districts[user.district]) || '';
        const dist = _.values(_.get(cities, `[${user.city}].districts`, {}));
        const district = !_.isEmpty(user.district) && user.district >= 0 && dist[user.district];
        return (
            <div className={`${style.innerBox} ${style.confirmBox}`}>
                <section>
                    <h3>Xác nhận thanh toán</h3>
                    <ul>
                        <li>
                            <span className={style.name}>Họ và tên:</span>
                            <span>{user.fullname}</span>
                        </li>
                        <li>
                            <span className={style.name}>Email:</span>
                            <span>{user.email}</span>
                        </li>
                        <li>
                            <span className={style.name}>Số điện thoại:</span>
                            <span>{user.phone}</span>
                        </li>
                        <li>
                            <span className={style.name}>Tỉnh/Thành phố:</span>
                            <span>{city}</span>
                        </li>
                        <li>
                            <span className={style.name}>Quận/Huyện:</span>
                            <span>{district}</span>
                        </li>
                        <li>
                            <span className={style.name}>Địa chỉ:</span>
                            <span>{user.address}</span>
                        </li>

                        <li>
                            <span className={style.name}>Ghi chú:</span>
                            <span>{user.note}</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Phương thức thanh toán</h3>
                    <div className={style.inner}>
                        <div className={style.icMethod}>
                            <img
                                src={`/static/assets/images/method_${method}.png`}
                                alt="Công ty sách MCBooks – Knowlege sharing"
                            />
                        </div>

                        <div className={style.text}>
                            <h4>{METHODS[method]}</h4>
                            {method === 'cod' && (
                                <p>
                                    {user.address}
                                    {district && `, ${district}`}
                                    {city && `, ${city}`}
                                </p>
                            )}
                            {method === 'nl' && <p>Cổng thanh toán ngân lượng</p>}
                            {method === 'ib' && <p>Chuyển tiền vào tài khoản của chúng tôi</p>}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Confirm.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    user: PropTypes.object.isRequired,
    method: PropTypes.string.isRequired,
    cities: PropTypes.array
};

export default Confirm;
