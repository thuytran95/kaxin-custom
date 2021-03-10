import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { DatePicker } from 'antd';
import { Cube as Overlay } from 'src/shared/components/loading';
import ErrMessage from 'src/components/errors/ErrMessage';
import classnames from 'classnames';
import ImageUpload from './components/ImageUpload';
import Validation from 'src/helpers/Validation';
import Swal from 'sweetalert2';
class UserForm extends PureComponent {
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
                job: '',
                ..._.pick(userInfo, 'city', 'district')
            },
            dataPreview: {
                ..._.pick(userInfo, 'avatar')
            },
            validationForm: {}
        };
    }
    componentDidMount() {
        this.updateData();
    }
    updateData = () => {
        const { authInfo: { userInfo = {} } } = this.props;
        this.setState({
            data: {
                ...this.state.data,
                ..._.pick(userInfo, 'fullname', 'firstName', 'birthday', 'email', 'phone', 'address', 'job')
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
    disabledDate = current => {
        return (
            current &&
            current >
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
                }
            });
        } else {
            this.setState({
                data: {
                    ...this.state.data,
                    birthday: null
                }
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
                }
            });
        } else {
            this.setState({
                data: { ...this.state.data, avatar: '' },
                dataPreview: {
                    ...this.state.dataPreview,
                    avatar: ''
                }
            });
        }
    };

    updateUser = () => {
        const { authInfo, authActions, stopEdit } = this.props;
        const { data } = this.state;
        const inputs = document.getElementById('userForm').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, this.state.validationForm);
        this.setState({ isFetching: true, validationForm: validationForm });
        if (data.phone.length < 10 || data.phone.length > 15) {
            validationForm.phone = 'Số điện thoại không đúng định dạng';
        }
        if (_.isEmpty(validationForm)) {
            authActions
                .updateUser(_.get(authInfo, 'userInfo.id'), { ...data, fullname: data.firstName })
                .then(res => {
                    this.setState({ isFetching: false });
                    stopEdit();
                    Swal({
                        title: 'Cập nhật thành công',
                        text: 'Chúc mừng bạn đã cập nhật thông tin cá nhân thành công.',
                        type: 'success',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                })
                .catch(err => {
                    this.setState({ isFetching: false });
                    stopEdit();
                    Swal({
                        title: 'Cập nhật lỗi',
                        text: 'Xin lỗi bạn đã cập nhật thông tin cá nhân không thành công.',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                });
        } else {
            this.setState({ isFetching: false });
        }
    };

    render() {
        const { stopEdit, cities } = this.props;
        const { data, dataPreview } = this.state;
        const dateFormat = 'DD/MM/YYYY';
        return (
            <Fragment>
                <Overlay loading={this.state.isFetching} />
                <div className={style.headerSection}>
                    <h2>Thông tin cá nhân</h2>
                    <div className={style.btnActions}>
                        <Button onClick={stopEdit}>Hủy</Button>
                        <Button
                            className={style.edit}
                            onClick={e => {
                                e.preventDefault();
                                this.updateUser();
                            }}
                            disabled={!_.isEmpty(this.state.validationForm)}
                        >
                            Lưu lại
                        </Button>
                    </div>
                </div>
                <div className={style.content}>
                    <Form
                        id="userForm"
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <div className="row">
                            <div className="col-xs-12 col-lg-4">
                                <ImageUpload onChange={this._handleChangeImage} value={dataPreview.avatar} />
                            </div>

                            <div className="col-xs-12 col-lg-8">
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
                                    />
                                    <ErrMessage name="firstName" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ngày sinh</Label>
                                    <DatePicker
                                        disabledDate={this.disabledDate}
                                        format={dateFormat}
                                        name="birthday"
                                        onChange={this._handleChangeBirthday}
                                        value={!_.isEmpty(data.birthday) ? moment(data.birthday, dateFormat) : null}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input disabled name="email" value={data.email} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Điện thoại <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
                                        name="phone"
                                        value={data.phone}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['phone']
                                        })}
                                    />

                                    <ErrMessage name="phone" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Tỉnh/Thành phố</Label>

                                    <Input
                                        type="select"
                                        name="city"
                                        defaultValue={data.city}
                                        onChange={this._handleChangeInput}
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
                                        defaultValue={data.district}
                                        onChange={this._handleChangeInput}
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
                                <FormGroup>
                                    <Label>Địa chỉ</Label>
                                    <Input name="address" value={data.address} onChange={this._handleChangeInput} />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Nghề nghiệp</Label>
                                    <Input
                                        name="job"
                                        value={data.job}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['job']
                                        })}
                                        disabled={dataPreview.regTeacher ? true : false}
                                    />

                                    <ErrMessage name="job" obj={this.state.validationForm} />
                                </FormGroup>
                            </div>
                        </div>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
UserForm.defaultProps = {
    authInfo: {},
    userActions: {},
    cities: []
};

UserForm.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    stopEdit: PropTypes.func,
    cities: PropTypes.array
};

export default UserForm;
