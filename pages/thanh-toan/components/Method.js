
import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Table } from 'reactstrap';
import { Radio } from 'antd';

class Method extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toogleNote: false
        };
    }

    handleChangeInput = e => {
        this.props.onChange(e.target.value);
    };
    handleSubmit = e => {
        e.preventDefault();
    };
    toogleNote = () => {
        this.setState({ toogleNote: !this.state.toogleNote });
    };
    closeNote = () => {
        this.setState({ toogleNote: false });
    };
    render() {
        const { method } = this.props;

        return (
            <div className={`${style.innerBox}`}>
                <h3 className={style.titleBox}>Phương thức thanh toán</h3>
                <div className={style.checkoutMethod}>
                    <Form onSubmit={this.handleSubmit}>
                        <Radio.Group onChange={this.handleChangeInput} value={method}>
                            <Radio value="cod">
                                <div className={style.inner}>
                                    <div className={style.icMethod}>
                                        <img
                                            src="/static/assets/images/method_cod.png"
                                            alt="Công ty sách MCBooks – Knowlege sharing"
                                        />
                                    </div>

                                    <div className={style.text}>
                                        <h4>Thanh toán khi nhận hàng</h4>
                                        <h5 className={style.subTitle}>COD</h5>
                                    </div>
                                </div>
                            </Radio>
                            <Radio value="nl">
                                <div className={style.inner}>
                                    <div className={style.icMethod}>
                                        <img
                                            src="/static/assets/images/method_nl.png"
                                            alt="Công ty sách MCBooks – Knowlege sharing"
                                        />
                                    </div>
                                    <div className={style.text}>
                                        <h4>Thanh toán trực tuyến</h4>
                                        <h5 className={style.subTitle}>Cổng thanh toán ngân lượng</h5>
                                    </div>
                                </div>
                            </Radio>
                            <Radio value="ib">
                                <div className={style.inner}>
                                    <div className={style.icMethod}>
                                        <img
                                            src="/static/assets/images/method_ib.png"
                                            alt="Công ty sách MCBooks – Knowlege sharing"
                                        />
                                    </div>
                                    <div className={style.text}>
                                        <h4>THANH TOÁN CHUYỂN KHOẢN</h4>
                                        <h5 className={`visible-small ${style.toogleNote}`} onClick={this.toogleNote}>
                                            Hướng dẫn thanh toán
                                        </h5>
                                        <section
                                            className={classnames({
                                                active: this.state.toogleNote === true
                                            })}
                                        >
                                            <div className={style.guide}>
                                                <h6 className={style.titleMobi}>Hướng dẫn thanh toán:</h6>
                                                <p>
                                                    Vui lòng chuyển khoản vào một trong các tài khoản bên dưới với các
                                                    thông tin sau:
                                                </p>
                                                <ul>
                                                    <li>Tên chủ tài khoản: Vũ Bá Hùng</li>
                                                    <li>Nội dung chuyển khoản: (mã đơn hàng)</li>
                                                </ul>
                                            </div>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Ngân hàng</th>
                                                        <th>Chi nhánh</th>
                                                        <th>Số tài khoản</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Ngân hàng Á Châu ACB</td>
                                                        <td>Giảng Võ </td>
                                                        <td>863688888</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <div className={style.note}>
                                                <h6>Lưu ý:</h6>
                                                <ul>
                                                    <li>
                                                        Chuyển chính xác số tiền, không làm tròn, cộng gộp nhiều đơn
                                                    </li>
                                                    <li>
                                                        Chịu phí chuyển khoản để MCB nhận được chính xác số tiền đơn
                                                        hàng
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </Radio>
                        </Radio.Group>
                    </Form>
                </div>
            </div>
        );
    }
}

Method.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    method: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Method;
