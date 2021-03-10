import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { notification, DatePicker } from 'antd';
import { Cube as Overlay } from 'src/shared/components/loading';
import ErrMessage from 'src/components/errors/ErrMessage';
import classnames from 'classnames';
import Validation from 'src/helpers/Validation';
import { redirect } from 'src/helpers/Common';
import Link from 'next/link';

class SignUpContainer extends PureComponent {
    constructor(props) {
        super(props);
        const { authInfo: { userInfo = {} } } = props;
        this.state = {
            isFetching: false,
            date: moment(),
            data: {
                fullname: '',
                firstName: '',
                birthday: '',
                email: '',
                phone: '',
                address: '',
                accountName: '',
                bank: '',
                bankBranch: '',
                accountNumber: '',
                ..._.pick(userInfo, 'city', 'district')
            },
            dataPreview: {
                ..._.pick(userInfo, 'createdTimestamp')
            },
            validationForm: {},
            isRegPartner: false
        };
    }

    componentDidMount() {
        this.updateData();
    }
    updateData = () => {
        const { authInfo: { userInfo = {} } } = this.props;
        this.setState({
            data: {
                ..._.pick(
                    userInfo,
                    'fullname',
                    'firstName',
                    'birthday',
                    'email',
                    'phone',
                    'address',
                    'accountName',
                    'bank',
                    'bankBranch',
                    'accountNumber'
                )
            }
        });
    };
    _handleChangeInput = e => {
        const { data, validationForm } = this.state;
        const { name, value } = e.target;
        if (name === 'phone') {
            const validationConfirm = Validation.checkPhone({ phone: data.phone });
            this.setState(prevState => ({
                validationForm: Validation.updateValidationForm(validationConfirm, prevState.validationForm)
            }));
        } else {
            const validationInput = Validation.validationOnChange(e.target);
            this.setState({
                validationForm: Validation.updateValidationForm(validationInput, validationForm)
            });
        }
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };
    _onChangeDescription = value => {
        this.setState({
            data: { ...this.state.data, description: value },
            validationForm: {}
        });
    };
    _onChangeExpertise = value => {
        this.setState({
            data: { ...this.state.data, expertise: value },
            validationForm: {}
        });
    };
    disabledDate = current => {
        return (
            current &&
            current >=
                moment()
                    .subtract(1, 'day')
                    .endOf('day')
        );
    };
    _handleChangeBirthday = (date, dateString) => {
        if (date) {
            this.setState({
                data: {
                    ...this.state.data,
                    birthday: moment(date).format('DD/MM/YYYY')
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: {
                    ...this.state.data,
                    birthday: null
                },
                validationForm: {}
            });
        }
    };

    _handleChangeImage = avatar => {
        if (avatar) {
            this.setState({
                data: {
                    ...this.state.data,
                    avatar: avatar.path
                },
                dataPreview: {
                    ...this.state.dataPreview,
                    avatar: avatar.uri
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: { ...this.state.data, avatar: '' },
                dataPreview: {
                    ...this.state.dataPreview,
                    avatar: ''
                },
                validationForm: {}
            });
        }
    };
    _handleChangeCV = cv => {
        if (cv) {
            this.setState({
                data: {
                    ...this.state.data,
                    cv: cv.path
                },
                dataPreview: {
                    ...this.state.dataPreview,
                    cv: cv.uri
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: { ...this.state.data, cv: '' },
                dataPreview: {
                    ...this.state.dataPreview,
                    cv: ''
                },
                validationForm: {}
            });
        }
    };

    updateUser = () => {
        const { authInfo, authActions } = this.props;
        const { data, dataPreview } = this.state;
        const params = {
            ...data,
            fullname: data.firstName,
            regPartner: true,
            regPartnerDate: moment(parseInt(dataPreview.createdTimestamp, 0)).format('DD/MM/YYYY')
        };
        const inputs = document.getElementById('userForm').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, this.state.validationForm);
        if (_.isNull(data.birthday) || _.isEmpty(data.birthday) || data.birthday === '') {
            validationForm.birthday = 'Vui lòng chọn ngày sinh';
        }
        if (data.phone.length < 10 || data.phone.length > 15) {
            validationForm.phone = 'Số điện thoại không đúng định dạng';
        }
        this.setState({ isFetching: true, validationForm: validationForm });
        if (_.isEmpty(validationForm)) {
            this.setState({ isFetching: false });
            authActions
                .updateUser(_.get(authInfo, 'userInfo.id'), { ...params })
                .then(res => {
                    this.setState({ isFetching: false, isRegPartner: true });
                })
                .catch(err => {
                    this.setState({ isFetching: false });
                    notification['error']({ message: 'Đăng ký không thành công.' });
                });
        } else {
            this.setState({ isFetching: false });
        }
    };
    onCloseRegPartner = () => {
        this.setState(
            {
                isRegPartner: false
            },
            () => {
                redirect('/lay-link-affiliate');
            }
        );
    };
    render() {
        const { data } = this.state;
        const dateFormat = 'DD/MM/YYYY';
        const { authInfo: { userInfo = {} }, cities } = this.props;
        const isPartner = userInfo.role === 'partner' || userInfo.rolePermissions.name === 'partner' ? true : false;
        return (
            <Fragment>
                <Overlay loading={this.state.isFetching} />
                <div className="empty-page-style">
                    <div className={style.logo}>
                        <Link href="/">
                            <a>
                                <img
                                    src="/static/assets/images/logo/logo.png"
                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                />
                            </a>
                        </Link>
                    </div>

                    <div className={style.content}>
                        <h2>Đăng kí làm cộng tác viên</h2>
                        <Form
                            id="userForm"
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <div className={style.boxUser}>
                                <div className={style.twice}>
                                    <FormGroup>
                                        <Label>
                                            Họ và tên <span className="color-red"> *</span>
                                        </Label>
                                        <Input
                                            required
                                            name="firstName"
                                            value={data.firstName}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['firstName']
                                            })}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="firstName" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>
                                            Ngày sinh <span className="color-red"> *</span>
                                        </Label>
                                        <DatePicker
                                            disabledDate={this.disabledDate}
                                            defaultValue={
                                                !_.isEmpty(data.birthday) ? moment(data.birthday, dateFormat) : ''
                                            }
                                            format={dateFormat}
                                            name="birthday"
                                            onChange={this._handleChangeBirthday}
                                            value={!_.isEmpty(data.birthday) ? moment(data.birthday, dateFormat) : ''}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="birthday" obj={this.state.validationForm} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            Email <span className="color-red"> *</span>
                                        </Label>
                                        <Input disabled name="email" value={data.email} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>
                                            Điện thoại <span className="color-red"> *</span>
                                        </Label>
                                        <Input
                                            required
                                            type="number"
                                            name="phone"
                                            value={data.phone}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['phone']
                                            })}
                                            disabled={isPartner}
                                        />

                                        <ErrMessage name="phone" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tỉnh/Thành phố</Label>

                                        <Input
                                            type="select"
                                            name="city"
                                            value={data.city}
                                            onChange={this._handleChangeInput}
                                            disabled={isPartner}
                                        >
                                            <option value={-1}>-- Chọn Tỉnh/Thành phố --</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={index}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Quận huyện</Label>

                                        <Input
                                            type="select"
                                            name="district"
                                            value={data.district}
                                            onChange={this._handleChangeInput}
                                            disabled={isPartner}
                                        >
                                            <option value={-1}>-- Chọn Quận/Huyện --</option>
                                            {_.map(
                                                _.values(_.get(cities, `[${data.city}].districts`, {})),
                                                (district, index) => (
                                                    <option key={index} value={index}>
                                                        {district}
                                                    </option>
                                                )
                                            )}
                                        </Input>
                                    </FormGroup>
                                </div>

                                <FormGroup>
                                    <Label>Địa chỉ</Label>
                                    <Input
                                        name="address"
                                        value={data.address}
                                        onChange={this._handleChangeInput}
                                        disabled={isPartner}
                                    />
                                </FormGroup>
                            </div>

                            <div className={style.bankInfo}>
                                <h4>Thông tin tài khoản thanh toán</h4>
                                <div className={style.twice}>
                                    <FormGroup>
                                        <Label>Tên chủ tài khoản</Label>
                                        <Input
                                            name="accountName"
                                            value={data.accountName}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['accountName']
                                            })}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="accountName" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ngân hàng</Label>
                                        <Input
                                            name="bank"
                                            value={data.bank}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['bank']
                                            })}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="bank" obj={this.state.validationForm} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Chi nhánh</Label>
                                        <Input
                                            name="bankBranch"
                                            value={data.bankBranch}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['bankBranch']
                                            })}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="bankBranch" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Số tài khoản</Label>
                                        <Input
                                            name="accountNumber"
                                            value={data.accountNumber}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['accountNumber']
                                            })}
                                            disabled={isPartner}
                                        />
                                        <ErrMessage name="accountNumber" obj={this.state.validationForm} />
                                    </FormGroup>
                                </div>
                            </div>

                            <div className={style.buttons}>
                                <Link href="/">
                                    <a className="btn">Quay lại</a>
                                </Link>
                                {userInfo.role === 'customer' || userInfo.rolePermissions.name === 'customer' ? (
                                    <Button
                                        className={style.edit}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.updateUser();
                                        }}
                                    >
                                        Đăng ký
                                    </Button>
                                ) : null}
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    className={classnames([style.popupWrapper], {
                        [style.active]: this.state.isRegPartner
                    })}
                >
                    <div className={style.overlay} onClick={this.onCloseRegPartner} />
                    <div className={style.popupContent}>
                        <section>
                            <h5>Chúc mừng bạn đã trở thành cộng tác viên của Kaixin!</h5>
                            <p>Bạn có thể bắt đầu lấy link khoá học để chia sẻ từ bây giờ!</p>
                            <div className={style.btnActions}>
                                <Link href="/lay-link-affiliate">
                                    <a className="btn">ok</a>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }
}

SignUpContainer.defaultProps = {
    authInfo: {},
    cities: []
};

SignUpContainer.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cities: PropTypes.array
};

export default SignUpContainer;
