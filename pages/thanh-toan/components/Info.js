import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Progress } from 'antd';
import Link from 'next/link';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import ErrMessage from 'src/components/errors/ErrMessage';
import _ from 'lodash';
//import { CITIES } from '../constants';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangeInput = e => {
        const { name, value } = e.target;

        this.props.onChange(name, value.trim());
    };

    render() {
        const { auth, user, validationForm, cities } = this.props;
        const { userInfo = {} } = auth;
        return (
            <div className={`${style.innerBox}`}>
                <h3 className={style.titleBox}>Thông tin thanh toán</h3>
                <div className={style.checkoutForm}>
                    {!userInfo.id && (
                        <section>
                            <h4>Đăng nhập để mua hàng</h4>
                            <Link as="/dang-nhap" href={{ pathname: '/dang-nhap', query: { redirect: '/thanh-toan' } }}>
                                <a className="btn btn-default">Đăng nhập </a>
                            </Link>
                        </section>
                    )}

                    <section>
                        {!userInfo.id && <h4>Hoặc nhập thông tin giao hàng</h4>}
                        <Form>
                            <FormGroup>
                                <Label>Họ và tên</Label>
                                <Input
                                    name="fullname"
                                    defaultValue={user.fullname}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['fullname']
                                    })}
                                />
                                <ErrMessage name="fullname" obj={validationForm} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    defaultValue={user.email}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['email']
                                    })}
                                />
                                <ErrMessage name="email" obj={validationForm} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input
                                    name="phone"
                                    defaultValue={user.phone}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['phone']
                                    })}
                                />
                                <ErrMessage name="phone" obj={validationForm} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tỉnh/Thành phố</Label>
                                <Input
                                    type="select"
                                    name="city"
                                    value={user.city}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['city']
                                    })}
                                >
                                    <option value={-1}>-- Chọn Tỉnh/Thành phố --</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={index}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Input>
                                <ErrMessage name="city" obj={validationForm} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Quận/Huyện</Label>
                                <Input
                                    type="select"
                                    name="district"
                                    value={user.district}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['district']
                                    })}
                                >
                                    <option value={-1}>-- Chọn Quận/Huyện --</option>
                                    {_.map(
                                        _.values(_.get(cities, `[${user.city}].districts`, {})),
                                        (district, index) => (
                                            <option key={index} value={index}>
                                                {district}
                                            </option>
                                        )
                                    )}
                                </Input>
                                <ErrMessage name="district" obj={validationForm} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Địa chỉ</Label>
                                <Input
                                    name="address"
                                    defaultValue={user.address}
                                    onChange={this.handleChangeInput}
                                    className={classnames({
                                        'is-invalid text-danger': validationForm['address']
                                    })}
                                />
                                <ErrMessage name="address" obj={validationForm} />
                            </FormGroup>
                            <FormGroup className={style.fullInput}>
                                <Label>Ghi chú</Label>
                                <Input
                                    type="textarea"
                                    name="note"
                                    defaultValue={user.note}
                                    onChange={this.handleChangeInput}
                                />
                            </FormGroup>
                        </Form>
                    </section>
                </div>
            </div>
        );
    }
}

Info.propTypes = {
    auth: PropTypes.object,
    cities: PropTypes.array,
    authActions: PropTypes.object,
    user: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validationForm: PropTypes.object.isRequired
};

export default Info;
