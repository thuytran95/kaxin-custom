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
import ImageUpload from '../components/ImageUpload';
import FileUpload from '../components/FileUpload';
import Validation from 'src/helpers/Validation';
import { redirect } from 'src/helpers/Common';

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
                job: '',
                description: '',
                expertise: ''
            },
            dataPreview: {
                ..._.pick(userInfo, 'avatar', 'cv', 'createdTimestamp', 'regTeacher')
            },
            agree: false,
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
                ..._.pick(
                    userInfo,
                    'fullname',
                    'firstName',
                    'birthday',
                    'email',
                    'phone',
                    'address',
                    'job',
                    'description',
                    'expertise'
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
    _handleChangeAgree = e => {
        const { name, checked } = e.target;
        this.setState({
            [name]: checked
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
            regTeacher: true,
            regDate: moment(parseInt(dataPreview.createdTimestamp, 0)).format('DD/MM/YYYY')
        };
        const inputs = document.getElementById('userForm').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, this.state.validationForm);
        if (_.isNull(dataPreview.cv) || _.isEmpty(dataPreview.cv) || dataPreview.cv === '') {
            validationForm.cv = 'Vui lòng tải lên CV của bạn';
        }
        if (_.isNull(data.birthday) || _.isEmpty(data.birthday) || data.birthday === '') {
            validationForm.birthday = 'Vui lòng chọn ngày sinh';
        }
        if (data.phone.length < 10 || data.phone.length > 15) {
            validationForm.phone = 'Số điện thoại không đúng định dạng';
        }
        this.setState({ isFetching: true, validationForm: validationForm });
        //console.log(data);
        if (_.isEmpty(validationForm)) {
            this.setState({ isFetching: false });
            authActions
                .updateUser(_.get(authInfo, 'userInfo.id'), { ...params })
                .then(res => {
                    this.setState({ isFetching: false });
                    notification['success']({
                        message: 'Bạn đã đăng ký làm giảng viên thành công. Vui lòng đợi xác nhận'
                    });
                    redirect('/thong-tin-ca-nhan');
                })
                .catch(err => {
                    this.setState({ isFetching: false });
                    notification['error']({
                        message: 'Đăng ký không thành công.'
                    });
                });
        } else {
            this.setState({ isFetching: false });
        }
    };

    render() {
        const { data, dataPreview } = this.state;
        const dateFormat = 'DD/MM/YYYY';
        const { authInfo: { userInfo = {} } } = this.props;
        return (
            <Fragment>
                <Overlay loading={this.state.isFetching} />
                <div className={style.headerSection}>
                    <h2>Thông tin đăng ký</h2>
                    {userInfo.rolePermissions.name === 'teacher' ? null : (
                        <div className={style.btnActions}>
                            {dataPreview.regTeacher ? (
                                <Button className={style.edit} disabled={true}>
                                    Đang chờ duyệt
                                </Button>
                            ) : (
                                <Button
                                    className={style.edit}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.updateUser();
                                    }}
                                    disabled={!this.state.agree}
                                >
                                    Đăng ký
                                </Button>
                            )}
                        </div>
                    )}
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
                                {dataPreview.regTeacher ? (
                                    <div className={style.disabled}>
                                        <ImageUpload onChange={this._handleChangeImage} value={dataPreview.avatar} />
                                    </div>
                                ) : (
                                    <ImageUpload onChange={this._handleChangeImage} value={dataPreview.avatar} />
                                )}
                            </div>

                            <div className="col-xs-12 col-lg-8">
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
                                            disabled={dataPreview.regTeacher ? true : false}
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
                                            disabled={dataPreview.regTeacher ? true : false}
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
                                            disabled={dataPreview.regTeacher ? true : false}
                                        />

                                        <ErrMessage name="phone" obj={this.state.validationForm} />
                                    </FormGroup>
                                </div>

                                <FormGroup>
                                    <Label>Địa chỉ</Label>
                                    <Input
                                        name="address"
                                        value={data.address}
                                        onChange={this._handleChangeInput}
                                        disabled={dataPreview.regTeacher ? true : false}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>
                                        Nghề nghiệp <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
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
                                <FormGroup>
                                    <Label>
                                        Giới thiệu <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="description"
                                        value={data.description}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['description']
                                        })}
                                        disabled={dataPreview.regTeacher ? true : false}
                                    />
                                    <ErrMessage name="description" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Kink nghiệm <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="expertise"
                                        value={data.expertise}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['expertise']
                                        })}
                                        disabled={dataPreview.regTeacher ? true : false}
                                    />
                                    <ErrMessage name="expertise" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        CV của bạn <span className="color-red"> *</span>
                                    </Label>
                                    {dataPreview.regTeacher ? (
                                        <div className={style.disabled}>
                                            <FileUpload onChange={this._handleChangeCV} value={dataPreview.cv} />
                                        </div>
                                    ) : (
                                        <FileUpload onChange={this._handleChangeCV} value={dataPreview.cv} />
                                    )}
                                    <span className={style.notiText}>Dung lượng tối đa: 500MB</span>
                                    <ErrMessage name="cv" obj={this.state.validationForm} />
                                </FormGroup>
                                {userInfo.rolePermissions.name === 'teacher' ? null : (
                                    <div className={style.btnActions}>
                                        {dataPreview.regTeacher ? null : (
                                            <FormGroup check className={style.agree}>
                                                <Label
                                                    check
                                                    className={classnames({
                                                        'text-danger': this.state.validationForm['agree']
                                                    })}
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        name="agree"
                                                        value={this.state.agree}
                                                        onChange={this._handleChangeAgree}
                                                    />Tôi đồng ý với các điều khoản về giảng viên của{' '}
                                                    <strong>Kaixin.vn</strong>
                                                    <ErrMessage name="agree" obj={this.state.validationForm} />
                                                </Label>
                                            </FormGroup>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

SignUpContainer.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cities: PropTypes.array
};

export default SignUpContainer;
